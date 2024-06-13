describe('Example App Testing', () => {

    context('Styled Single Select Bar', () => {
        function scroll(loc1, loc2){
            return driver.action('pointer', {parameters: {pointerType: 'touch'}})
            .move({duration : 200, x: loc1['x'], y: loc1['y']})
            .down({button: 0})
            .move({duration : 2000, x: loc2['x'], y: loc2['y']})
            .up({button : 0});
        }
        function dropDownArrow(){
            return driver.$('-android uiautomator:new UiSelector().text("ᨆ").instance(0)');
        }

        function getItemList(){
            return driver.$('-android uiautomator:new UiSelector().className("android.view.ViewGroup").instance(5)');
        }

        function getItem(item){
            return driver.$(`accessibility id:${item}`)
        }
    
        beforeEach(async () => {
            await driver.pause(1500);
            await scroll({x: 950, y: 2600}, {x: 950, y: 600}).perform();
            await driver.pause(1000);
            await scroll({x: 950, y: 2600}, {x: 950, y: 600}).perform();
            const dropDown = await dropDownArrow()
            dropDown.click();
        })


        selectItem('Item 6');

        function selectItem(item){
            it(`'should have ${item} selected`, async () => {
                var group = await getItemList();
                var displayedContent = await group.$$('.android.widget.TextView');
                //console.log(displayedContent)
                var displayedItemList = [];
                for(let i = 0; i< displayedContent.length; i++){
                    displayedItemList.push(await displayedContent[i].getAttribute('text'));
                }
                //console.log(displayedItemList);

                if(displayedItemList.indexOf(item) != -1){
                    const selected = await getItem(item);
                    selected.click();
                    await driver.pause(500);
                }
                else{
                    const topItem = displayedContent[0];
                    const bottomItem = displayedContent[displayedContent.length-1];
                    const locTop = await topItem.getLocation();
                    const locBottom = await bottomItem.getLocation();
                    console.log(locTop);
                    console.log(locBottom);
                    await scroll(locBottom, locTop).perform();
                    await driver.pause(1000);
                    const selected = await getItem(item);
                    selected.click();
                    await driver.pause(500);
                }

            })
        }
    })
})