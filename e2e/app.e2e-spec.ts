import { CantaloupePage } from './app.po';

describe('cantaloupe App', () => {
  let page: CantaloupePage;

  beforeEach(() => {
    page = new CantaloupePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
