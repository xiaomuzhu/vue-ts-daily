import { mount } from '@vue/test-utils';
import Card from '../Card.vue';

describe('card', () => {
  const wrapper = mount(Card);

  it('渲染正确的标记', () => {
    expect(wrapper.contains('h3')).toBe(true);
  });
});
