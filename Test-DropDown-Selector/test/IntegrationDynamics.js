describe("Integration test for the multi selector", () => {

    const itemCombo = [['Item 3', 'Item 8', 'Item 7', 'Item 6']]
    const multiSelectArrow = '-android uiautomator:new UiSelector().text(\"ᨆ\").instance(2)';
    const scrollCoordinatesSet = [{'x' :645, 'y1': 2320, 'y2': 1715},{'x' :625, 'y1': 1810, 'y2': 2445}];
    multipleItemSelectTest(itemCombo, multiSelectArrow, scrollCoordinatesSet);

    function multipleItemSelectTest(itemCombo, dropDownArrow, scrollCoordinates){
        context("When choosing multiple items that needs scrolling", () => {
            
            beforeEach(async () => {
                await driver.pause(2000);
                const multiSelector = await driver.$(dropDownArrow);
                //multiSelector.waitForExist(1000);
                multiSelector.click();
                await driver.pause(3000);
            })

            function downScroll(){
                return driver.action('pointer', {parameters: {pointerType: 'touch'}})
                .move({duration : 200, x: scrollCoordinates[0]['x'] , y: scrollCoordinates[0]['y1']})
                .down({button: 0})
                .move({duration : 600, x: scrollCoordinates[0]['x'] , y: scrollCoordinates[0]['y2']})
                .up({button: 0});
            }

            function upScroll(){
                return driver.action('pointer', {parameters: {pointerType: 'touch'}})
                .move({duration : 200, x: scrollCoordinates[1]['x'] , y: scrollCoordinates[1]['y1']})
                .down({button: 0})
                .move({duration : 600, x: scrollCoordinates[1]['x'] , y: scrollCoordinates[1]['y2']})
                .up({button: 0});
            }

            function getBackScreen() {
                return '-android uiautomator:new UiSelector().className("android.view.ViewGroup").instance(3)';
            }
            function getSelector(){
                return '-android uiautomator:new UiSelector().description("Click me, ᨆ").instance(1)';
            }
            function getItemGroup(){
                return '-android uiautomator:new UiSelector().className("android.view.ViewGroup").instance(5)';
            }
            function getDropDownArrow(){
                return dropDownArrow;
            }

            multipleItemTest(itemCombo[0]);
        
            function multipleItemTest(items){
                it(`should have ${items.join(', ')} selected`, async () => {
                    //Finding the Currently displaying Items on the list
                    var top = true;
                    var group = await driver.$(getItemGroup());
                    var displayedContent = await group.$$('.android.view.ViewGroup');
                    var displayedItemList = [];
                    for(let i = 1; i< displayedContent.length; i+=2){
                        displayedItemList.push(await displayedContent[i].getAttribute('content-desc'));
                    }
                    //console.log(displayedItemList);

                    for(let i = 0; i < items.length; i ++){
                        if(displayedItemList.indexOf(items[i]) == -1 && top){
                            await downScroll().perform();
                            await driver.pause(1000);
                            group = await driver.$(getItemGroup());
                            displayedContent = await group.$$('.android.view.ViewGroup');
                            displayedItemList = [];
                            for(let i = 1; i< displayedContent.length; i+=2){
                                displayedItemList.push(await displayedContent[i].getAttribute('content-desc'));
                            }
                            //console.log(displayedItemList);
                            top = false;
                            await driver.pause(1000);
                        }
                        else if(displayedItemList.indexOf(items[i]) == -1 && !top){
                            await upScroll().perform();
                            await driver.pause(1000);
                            group = await driver.$(getItemGroup());
                            displayedContent = await group.$$('.android.view.ViewGroup');
                            displayedItemList = [];
                            for(let i = 1; i< displayedContent.length; i+=2){
                                displayedItemList.push(await displayedContent[i].getAttribute('content-desc'));
                            }
                            //console.log(displayedItemList);
                            top = true;
                            await driver.pause(1000);
                        }
                        
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

                    await driver.pause(500);
                    const multiSelector = await driver.$(getDropDownArrow());
                    //await multiSelector.waitForExist(1000);
                    multiSelector.click();
                    await driver.pause(1000);

                    top = true;
                    group = await driver.$(getItemGroup());
                    displayedContent = await group.$$('.android.view.ViewGroup');
                    displayedItemList = [];
                    for(let i = 1; i< displayedContent.length; i+=2){
                        displayedItemList.push(await displayedContent[i].getAttribute('content-desc'));
                    }

                    for(let i = 0; i < items.length; i ++){
                        if(displayedItemList.indexOf(items[i]) == -1 && top){
                            await downScroll().perform();
                            await driver.pause(1000);
                            group = await driver.$(getItemGroup());
                            displayedContent = await group.$$('.android.view.ViewGroup');
                            displayedItemList = [];
                            for(let i = 1; i< displayedContent.length; i+=2){
                                displayedItemList.push(await displayedContent[i].getAttribute('content-desc'));
                            }
                            //console.log(displayedItemList);
                            top = false;
                            await driver.pause(1000);
                        }
                        else if(displayedItemList.indexOf(items[i]) == -1 && !top){
                            await upScroll().perform();
                            await driver.pause(1000);
                            group = await driver.$(getItemGroup());
                            displayedContent = await group.$$('.android.view.ViewGroup');
                            displayedItemList = [];
                            for(let i = 1; i< displayedContent.length; i+=2){
                                displayedItemList.push(await displayedContent[i].getAttribute('content-desc'));
                            }
                            //console.log(displayedItemList);
                            top = true;
                            await driver.pause(1000);
                        }
                        
                        const item = await driver.$(`accessibility id:${items[i]}`);
                        //await item.waitForExist(1000);
                        item.click();
                        await driver.pause(500);
                    }
 
                    const Screen = await driver.$(getBackScreen());
                    Screen.click();
                    await driver.pause(500);

                    const originalSelector = await driver.$(getSelector());
                    const originalSelectorDisplay = await originalSelector.$$('.android.widget.TextView')[0];
                    await originalSelectorDisplay.waitForExist(1000);
                    await expect(originalSelectorDisplay).toHaveText('Click me');
                })
            }
        })
    }
})