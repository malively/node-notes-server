import FactoryGirl from 'factory-girl';

import { Note } from '../../../src/api/models/Note';

FactoryGirl.define('note', Note, {
    title: FactoryGirl.chance('sentence'),
    content: FactoryGirl.chance('paragraph'),
  });
