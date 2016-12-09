// Copyright 2011, the Google Tasks Chrome Extension authors.
//
// Licensed under the Apache License, Version 2.0 (the 'License');
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an 'AS IS' BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

var NOTIFICATION_TIMEOUT = 3000;

function notify(logo, title, opt_body) {
  var body = opt_body || '';
  var notification = webkitNotifications.createNotification(logo,
      title, body);
  notification.show();
  var clear = function() {
    notification.cancel();
  }
  window.setTimeout(clear, NOTIFICATION_TIMEOUT);
}

function notifySuccess(body) {
  var logo = 'images/tasks-48x48.png';
  var title = 'Task added successfully!';
  notify(logo, title, body);
}

function notifyFailure(msg, code) {
  // TODO: Redirect to login UI flow and retry, if this is a problem.
  var logo = 'images/tasks-error-48x48.png';
  var title = msg + ' (' + code + ')';
  notify(logo, title);
}

function addTask(task) {
  var url = 'https://www.googleapis.com/tasks/v1/lists/@default/tasks';
  var req = {
    'method': 'POST',
    'headers': {
      'Content-type': 'application/json'
    },
    'body': JSON.stringify(task)
  };

  var addDone = function(resp, xhr) {
    if (xhr.status != 200) {
      notifyFailure('Couldn\'t add task.', xhr.status);
      return;
    }

    notifySuccess(task['title']);
  }

  oauth.sendSignedRequest(url, addDone, req);
}

function getTasks(cb) {
  var url = 'https://www.googleapis.com/tasks/v1/lists/@default/tasks';
  var req = {
    'method': 'GET',
    'headers': {
      'Content-type': 'application/json'
    },
  };

  var getDone = function(resp, xhr) {
    if (xhr.status != 200) {
      notifyFailure('Couldn\'t retrieve tasks.', xhr.status);
    }

    cb.call(this, JSON.parse(resp));
  }

  oauth.sendSignedRequest(url, getDone, req);
}
