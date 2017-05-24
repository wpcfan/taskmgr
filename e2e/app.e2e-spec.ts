import { TaskMgrPage } from './app.po';

describe('taskmgr App', () => {
  let page: TaskMgrPage;

  beforeEach(() => {
    page = new TaskMgrPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toContain('企业协作平台');
  });
});
