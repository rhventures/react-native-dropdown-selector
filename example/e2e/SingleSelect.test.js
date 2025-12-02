describe('Single Selection Functionality Tests', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  it('Should Test Deadly Simple Single Selection', async () => {
    await expect(element(by.id('SimpleDataSelect'))).toBeVisible();
    await element(by.id('SimpleDataSelect')).tap();
    await expect(element(by.label('Item 3'))).toBeVisible();
    await element(by.label('Item 3')).tap();
    await expect(element(by.text('Selected: Item 3 (scroll down)'))).toBeVisible();
  });

  it('Should Test Scroll Down Selection List', async () => {
    await element(by.id('SimpleDataSelect')).tap();
    await expect(element(by.label('Item 3'))).toBeVisible();
    await element(by.label('Item 4')).swipe('up', 'slow');
    await expect(element(by.label('Item 8'))).toBeVisible();
  });

  it('Should Test Change Selection Value to Item 8', async () => {
    await expect(element(by.label('Item 8'))).toBeVisible();
    await element(by.label('Item 8')).tap();
    await expect(element(by.text('Selected: Item 8 (scroll down)'))).toBeVisible();
  });

  it('Should Test Change Multiple Single Selection to Different Items', async () => {
    await device.reloadReactNative();

    const scrollView = element(by.type('android.widget.ScrollView'));
    await scrollView.scroll(800, 'down');

    await expect(element(by.id('DataSelect(1)'))).toBeVisible();
    await expect(element(by.id('DataSelect(2)'))).toBeVisible();
    await expect(element(by.id('DataSelect(3)'))).toBeVisible();

    await element(by.id('DataSelect(1)')).tap();
    await expect(element(by.label('Item 3'))).toBeVisible();
    await element(by.label('Item 7')).tap();

    await element(by.id('DataSelect(2)')).tap();
    await expect(element(by.label('Item 3'))).toBeVisible();
    await element(by.label('Item 4')).tap();

    await element(by.id('DataSelect(3)')).tap();
    await expect(element(by.label('Item 3'))).toBeVisible();
    await element(by.label('Item 4')).swipe('up', 'slow');
    await expect(element(by.label('Item 8'))).toBeVisible();
    await element(by.label('Item 8')).tap();
    await element(by.label('Item 8')).toBeVisible;
  });
});