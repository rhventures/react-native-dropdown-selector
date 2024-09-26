describe("Scrolling", ()=> {

    const firstSelectorArrow = "-android uiautomator:new UiSelector().text(\"ᨆ\").instance(0)";
    const secondSelectorArrow = "-android uiautomator:new UiSelector().text(\"ᨆ\").instance(1)";
    const thirdSelectorArrow = "-android uiautomator:new UiSelector().text(\"ᨆ\").instance(2)";
    const dropDownArrows= [{'x': 1270, 'y': 463}, {'x': 910, 'y': 2283}, {'x': 1270, 'y': 2437}]
    const scrollCoordinates = [{'x': 596, 'y1': 1110, 'y2': 429}, {'x': 624, 'y1': 2191, 'y2': 1522}, {'x': 624, 'y1': 2334, 'y2': 1600}]
    TestDropDownSelectorTechnical(firstSelectorArrow, dropDownArrows[0], scrollCoordinates[0]);
    TestDropDownSelectorTechnical(secondSelectorArrow, dropDownArrows[1], scrollCoordinates[1]);
    TestDropDownSelectorTechnical(thirdSelectorArrow, dropDownArrows[2], scrollCoordinates[2]);
    
    function TestDropDownSelectorTechnical(SelectorArrow, dropDownArrow, scrollCoordinate){

        context("scrolling through the drop down bar", () => {
            
            beforeEach(async () => {
                await driver.pause(1000);
                const dropDownButton = await driver.$(SelectorArrow);
                dropDownButton.click();
                // do not use mouse actions on before each. 
                // It takes time for the testing to load so it wont work.
                await driver.pause(2500); //make sure this is here for the scrolling action to work. DO NOT REMOVE
                
            });
            const selector = '-android uiautomator:new UiSelector().className(\"android.view.ViewGroup\").instance(5)';
            const item_xPath = '//android.widget.ScrollView/android.view.ViewGroup/android.view.ViewGroup';
            testNumberOfItems(selector);
            testFirstFiveItems(item_xPath);
            testLastFiveItems(item_xPath);
            
            afterEach(async () => {
                await driver.action('pointer', {parameters: {pointerType: 'touch'}})
                    .move({duration : 0, x: dropDownArrow['x'] , y: dropDownArrow['y']})
                    .down({button: 0})
                    .up({button: 0})
                    .perform();
                await driver.pause(500);
            })
            
            function testNumberOfItems(selector){
                it('The list should always have 5 items showing', async ()=> {
                    const group = await driver.$(selector);
                    const list = await group.$$('.android.widget.TextView');
                    //console.log(list);
                    expect(list).toHaveLength(5);
                })
            }
            
            function testFirstFiveItems(xPath){
                it("should show the first five items in the list", async ()=> {
                    const list = [3, 7, 1, 2, 4];
                    for(let i = 1; i <= 5; i++){
                        const item = await driver.$(`${xPath}[${i}]`);
                        await expect(item).toExist();
                    }
                    
                    for(let i = 0; i < 5; i++){
                        const item = await driver.$(`accessibility id:Item ${list[i]}`);
                        await expect(item).toHaveAttribute('content-desc', `Item ${list[i]}`);
                    }
                })   
            }
            
            function testLastFiveItems(xPath){
                it("should show the last five items in the list after scrolling down", async () => {
                    
                    await driver.action('pointer', {parameters: {pointerType: 'touch'}})
                    .move({duration : 0, x: scrollCoordinate['x'], y: scrollCoordinate['y1']})
                    .down({button: 0})
                    .move({duration : 100, x: scrollCoordinate['x'], y: scrollCoordinate['y2']})
                    .up({button: 0})
                    .perform();

                    await driver.pause(500);
                    
                    
                    const list = ['Item 5', 'Item 6', 'Item 8', 'abc', 123];
                    for(let i = 1; i <= 5; i++){
                        const item = await driver.$(`${xPath}[${i}]`);
                        await expect(item).toExist();
                    }
                    
                    for(let i = 0; i < 5; i++){
                        const item = await driver.$(`accessibility id:${list[i]}`);
                        await expect(item). toHaveAttribute('content-desc', `${list[i]}`)
                    }
                    
                })
            }
            
        })
    }          
})