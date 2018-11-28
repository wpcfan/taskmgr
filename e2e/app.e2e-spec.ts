import { TaskmgrPage } from './app.po';
import { createWriteStream } from 'fs';
// abstract writing screen shot to a file
function writeScreenShot(data, filename) {
  const stream = createWriteStream(filename);
  stream.write(Buffer.from(data, 'base64'));
  stream.end();
}

describe('taskmgr App', () => {
  let page: TaskmgrPage;

  beforeEach(() => {
    page = new TaskmgrPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    page.fillInfo().then(result => writeScreenShot(result, 'sc001.jpg'));
    expect(page.getParagraphText()).toContain('企业协作平台');
  });
});
