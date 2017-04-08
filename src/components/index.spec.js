import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import PlayArea from './PlayArea';
import AttachPanel from './AttachPanel';
import ManInfo from './ManInfo';
import Tile from './Tile';

describe('components', () => {
  describe('App', () => {
    it('should render self and subcomponents', () => {
      const enzymeWrapper = shallow(<App />);

      expect(enzymeWrapper.find('div.app').length).toBe(1);
      expect(enzymeWrapper.find('h1').text()).toBe('SNAKE GAME');

      // expect(enzymeWrapper.find('Main').length).toBe(1);
    });
  });

  describe('PlayArea', () => {
    it('should render', () => {
      const enzymeWrapper = shallow(<PlayArea />);

      expect(enzymeWrapper.find('div.play-area').length).toBe(1);
      // expect(enzymeWrapper.find('Floor').length).toBe(1);
      // expect(enzymeWrapper.find('PromptInfo').length).toBe(1);
    });
  });

  describe('AttachPanel', () => {
    it('should render', () => {
      const enzymeWrapper = shallow(<AttachPanel />);

      expect(enzymeWrapper.find('div.attach-panel').length).toBe(1);
      // expect(enzymeWrapper.find('ScoreBoard').length).toBe(1);
      expect(enzymeWrapper.find('ManInfo').length).toBe(1);
    });
  });

  describe('ManInfo', () => {
    it('should render', () => {
      const enzymeWrapper = shallow(<ManInfo />);

      expect(enzymeWrapper.find('div.man-info').length).toBe(1);
    });
  });

  describe('Tile', () => {
    it('should render', () => {
      const props = {
        type: 'snake-head',
        snakeOrientation: 'LEFT',
      };
      const enzymeWrapper = shallow(<Tile {...props} />);

      expect(enzymeWrapper.find('div').hasClass('tile')).toBe(true);
      expect(enzymeWrapper.find('div').hasClass(props.type)).toBe(true);
      expect(enzymeWrapper.find('div').hasClass(props.snakeOrientation.toLowerCase())).toBe(true);
    });
  });
});
