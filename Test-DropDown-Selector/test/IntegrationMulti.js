describe("Integration test for the multi selector", () => {

    const itemCombo = [['Item 3', 'Item 7'], ['Item 4', 'Item 2']];
    const multiSelectArrow = '-android uiautomator:new UiSelector().text(\"ᨆ\").instance(2)';
    multipleItemSelectTest(itemCombo, multiSelectArrow);

    function multipleItemSelectTest(itemCombo, dropDownArrow){
        context("When choosing multiple items at once", () => {
            
            beforeEach(async () => {
                await driver.pause(1000);
                const multiSelector = await driver.$(dropDownArrow);
                multiSelector.click();
                await driver.pause(3000);
            })

            multipleItemTest(itemCombo[0]);
            multipleItemTest(itemCombo[1]);

            function multipleItemTest(items){
                it(`should have ${items.join(', ')} selected`, async () => {
                    for(let i = 0; i < items.length; i ++){
                        const item = await driver.$(`accessibility id:${items[i]}`);
                        item.click();
                        await driver.pause(500);
                    }

                    const backScreen = await driver.$('-android uiautomator:new UiSelector().className("android.view.ViewGroup").instance(3)');
                    backScreen.click();

                    await driver.pause(500);
                    const selector = await driver.$(`accessibility id:${items.join(', ')}, ᨆ`);
                    const selectorDisplay = await selector.$$('.android.widget.TextView')[0];

                    await expect(selectorDisplay).toHaveText(items.join(', '));

                    const multiSelector = await driver.$(dropDownArrow);
                    multiSelector.click();
                    await driver.pause(1000);

                    for(let i = 0; i < items.length; i ++){
                        const item = await driver.$(`accessibility id:${items[i]}`);
                        item.click();
                        await driver.pause(500);
                    } 
                    const Screen = await driver.$('-android uiautomator:new UiSelector().className("android.view.ViewGroup").instance(3)');
                    Screen.click();
                    driver.pause(500);
                })
            }
        })
    }
})