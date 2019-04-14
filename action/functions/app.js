// Copyright 2018, Google, Inc.
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

'use strict';

const askForSignIn = require('./intents/ask-for-sign-in');
const create = require('./intents/create');
const playback = require('./intents/playback');
const startUp = require('./intents/startup');
const go_to_menu = require('./intents/go_to_menu');
const list_teams = require('./intents/list_teams');
const create_team = require('./intents/create_team');
const check_invites = require('./intents/check_invites');
const fallback = require('./intents/fallback');

const CLIENT_ID = '836393444189-8m0pe63bmej74vn896u8iqdafic9nn1o.apps.googleusercontent.com';


const app = require('actions-on-google').dialogflow({
    clientId: CLIENT_ID,
});


/** Adds Intent-name & callback key value pairs to app */
function addIntents(...args) {
  for (let i = 0; i < args.length; i++) {
    for (const key in args[i]) {
      if (args[i].hasOwnProperty(key)) app.intent(key, args[i][key]);
    }
  }
}

addIntents(
  askForSignIn,
	startUp,
  create,
  fallback,
  create_team,
  check_invites,
  list_teams,
  go_to_menu,
  playback
);

app.middleware((conv) => {
  conv.hasScreen =
    conv.surface.capabilities.has('actions.capability.SCREEN_OUTPUT');
  conv.hasAudioPlayback =
    conv.surface.capabilities.has('actions.capability.AUDIO_OUTPUT');
  conv.hasWebBrowser =
    conv.surface.capabilities.has('actions.capability.WEB_BROWSER');
});
/*
app.intent('Default Welcome Intent', (conv) => {
  conv.ask('Welcome to Stand Up, you can create a stand up or playback previous ones.');
});
*/
console.log('exported app');

module.exports = app;
