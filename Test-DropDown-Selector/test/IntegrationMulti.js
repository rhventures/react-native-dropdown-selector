import { back } from "appium-uiautomator2-driver/build/lib/commands/navigation";

describe("Integration test for the multi selector", () => {

    const itemCombo = [['Item 3', 'Item 7'], ['Item 4', 'Item 2'], ['Item 1', 'Item 2', 'Item 3']
    ,['Item 5', 'Item 8'], ['Item 6', '123', 'abc']]
    const multiSelectArrow = '-android uiautomator:new UiSelector().text(\"ᨆ\").instance(2)';
    const scrollCoordinatesSet = [{'x' :645, 'y1': 2320, 'y2': 1715}];
    multipleItemSelectTest(itemCombo, multiSelectArrow, scrollCoordinatesSet);

    function multipleItemSelectTest(itemCombo, dropDownArrow, scrollCoordinates){
        context("When choosing multiple items at once", () => {
            
            beforeEach(async () => {
                await driver.pause(2000);
                const multiSelector = await driver.$(dropDownArrow);
                //multiSelector.waitForExist(1000);
                multiSelector.click();
                await driver.pause(3000);
            })

            function scroll(scrollCoordinates){
                return driver.action('pointer', {parameters: {pointerType: 'touch'}})
                .move({duration : 100, x: scrollCoordinates['x'] , y: scrollCoordinates['y1']})
                .down({button: 0})
                .move({duration : 500, x: scrollCoordinates['x'] , y: scrollCoordinates['y2']})
                .up({button: 0});
            }
            function getBackScreen() {
                return '-android uiautomator:new UiSelector().className("android.view.ViewGroup").instance(3)';
            }

            //multipleItemTest(itemCombo[0]);
            //multipleItemTest(itemCombo[1]);
            //multipleItemTest(itemCombo[2]);
            multipleItemTest(itemCombo[3], scrollCoordinates[0]);
            multipleItemTest(itemCombo[4], scrollCoordinates[0]);
        
            function multipleItemTest(items, scrollCoordinates = null){
                it(`should have ${items.join(', ')} selected`, async () => {
                    if(scrollCoordinates != null){
                        await scroll(scrollCoordinates).perform();
                        await driver.pause(500);
                    }

                    for(let i = 0; i < items.length; i ++){
                        const item = await driver.$(`accessibility id:${items[i]}`);
                        //await item.waitForExist(1000);
                        item.click();
                        await driver.pause(500);
                    }

                    const backScreen = await driver.$(getBackScreen());
                    //await backScreen.waitForExist(1000);
                    backScreen.click();
                    await driver.pause(500);

                    const selector = await driver.$(`accessibility id:${items.join(', ')}, ᨆ`);
                    //await selector.waitForExist(1000);
                    const selectorDisplay = await selector.$$('.android.widget.TextView')[0];
                    await selectorDisplay.waitForExist(500);

                    await expect(selectorDisplay).toHaveText(items.join(', '));

                    const multiSelector = await driver.$(dropDownArrow);
                    //await multiSelector.waitForExist(1000);
                    multiSelector.click();
                    await driver.pause(1000);

                    if(scrollCoordinates != null){
                        await scroll(scrollCoordinates).perform();
                        await driver.pause(500);
                    }

                    for(let i = 0; i < items.length; i ++){
                        const item = await driver.$(`accessibility id:${items[i]}`);
                        //await item.waitForExist(1000);
                        item.click();
                        await driver.pause(500);
                    } 
                    const Screen = await driver.$(getBackScreen());
                    //await Screen.waitForExist(1000);
                    Screen.click();
                    await driver.pause(500);
                })
            }
        })
    }
})