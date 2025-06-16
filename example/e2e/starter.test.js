describe('Example', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  // it('should show first selection screen', async () => {
  //   await expect(element(by.text('Click me'))).toBeVisible();
  // });

  it('Should Test First Selection', async () => {
    await expect(element(by.id('SimpleDataSelect'))).toBeVisible();
    await element(by.id('SimpleDataSelect')).tap();
    // await element(by.text('item 3')).tap();
    // await expect(element(by.text('Selected: item 3 (scroll down)'))).toBeVisible();
  });

  // it('should have welcome screen', async () => {
  //   await expect(element(by.id('welcome'))).toBeVisible();
  // });

  // it('should show hello screen after tap', async () => {
  //   await element(by.id('hello_button')).tap();
  //   await expect(element(by.text('Hello!!!'))).toBeVisible();
  // });

  // it('should show world screen after tap', async () => {
  //   await element(by.id('world_button')).tap();
  //   await expect(element(by.text('World!!!'))).toBeVisible();
  // });
});