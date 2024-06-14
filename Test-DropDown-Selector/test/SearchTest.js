describe('Using the Search Option', () => {

    context('When searching in the multi selector', () => {
        
        function scroll(loc1, loc2){
            return driver.action('pointer', {parameters: {pointerType: 'touch'}})
            .move({duration : 200, x: loc1['x'], y: loc1['y']})
            .down({button: 0})
            .move({duration : 2000, x: loc2['x'], y: loc2['y']})
            .up({button : 0});
        }

        function dropDownArrow(){
            return driver.$('-android uiautomator:new UiSelector().text("ᨆ").instance(1)');
        }

        function getItemList(){
            return driver.$('-android uiautomator:new UiSelector().className("android.view.ViewGroup").instance(7)');
        }

        function getItem(item){
            return driver.$(`accessibility id:${item}`)
        }

        function searchBar(){
            return driver.$('class name:android.widget.EditText');
        }

        before(async () => {
            await driver.pause(1500);
            await scroll({x: 950, y: 2600}, {x: 950, y: 450}).perform();
            await driver.pause(1000);
            await scroll({x: 950, y: 2600}, {x: 950, y: 450}).perform();
        })
        beforeEach(async () => {
            await driver.pause(500);
            const dropDown = await dropDownArrow()
            dropDown.click();
            await driver.pause(1000);
        })

        searchItem('ABC');

        function searchItem(item){
            it(`'should have items containing ${item} shown`, async () => {
                const searchBox = await searchBar();
                await searchBox.setValue(item);
                await driver.pause(500);

                var group = await getItemList();
                var displayedContent = await group.$$('.android.widget.TextView');
                //console.log(displayedContent)

                for(let i = 0; i < displayedContent.length; i++){
                    await expect(displayedContent[i]).toHaveAttribute('text', expect.stringContaining(item));
                }
        
            })
        }
    })
})