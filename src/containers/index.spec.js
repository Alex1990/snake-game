import React from 'react';
import { shallow } from 'enzyme';
import { Main } from './Main';
import { Floor } from './Floor';
import { PromptInfo } from './PromptInfo';
import { ScoreBoard } from './ScoreBoard';

describe('containers', () => {
  describe('Main', () => {
    const props = {
      initialize: jest.fn(),
      start: jest.fn(),
      togglePaused: jest.fn(),
      changeOrientation: jest.fn(),
    };
    const enzymeWrapper = shallow(<Main {...props} />);

    it('should render', () => {
      expect(enzymeWrapper.find('div.app-main').length).toBe(1);
      expect(enzymeWrapper.find('PlayArea').length).toBe(1);
      expect(enzymeWrapper.find('AttachPanel').length).toBe(1);
    });
  });

  describe('Floor', () => {
    const props = {
      tiles: [],
      snakeOrientation: 'LEFT',
    };
    const enzymeWrapper = shallow(<Floor {...props} />);

    it('should render', () => {
      expect(enzymeWrapper.find('div.floor').length).toBe(1);
    });
  });

  describe('PromptInfo', () => {
    it('should render', () => {
      const enzymeWrapper = shallow(<PromptInfo gameStatus="INITIALIZED" />);
      expect(enzymeWrapper.find('div.game-status-info').length).toBe(1);
    });

    it('should not render', () => {
      const enzymeWrapper = shallow(<PromptInfo gameStatus="RUNNING" />);
      expect(enzymeWrapper.find('div.game-status-info').length).toBe(0);
    });
  });

  describe('ScoreBoard', () => {
    it('should render', () => {
      const enzymeWrapper = shallow(<ScoreBoard score={0} />);
      expect(enzymeWrapper.find('div.score').length).toBe(1);
      expect(enzymeWrapper.find('span.score-value').text()).toBe('0');
    });
  });
});
