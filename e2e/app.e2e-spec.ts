import { PlayqTestWorkPage } from './app.po';

describe('playq-test-work App', () => {
  let page: PlayqTestWorkPage;

  beforeEach(() => {
    page = new PlayqTestWorkPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
