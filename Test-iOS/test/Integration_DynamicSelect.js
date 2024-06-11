describe('Multi Select Testing Including Scrolling Capability', () => {
    
    context('Using dynamics', () => {
    
        const topItemCoordinates = {'Item 3' : {'x': 200 , 'y': 550}, 'Item 7': {'x': 200, 'y': 590}, 
        'Item 1': {'x': 200, 'y': 630}, 'Item 2': {'x': 200, 'y': 670}, 
        'Item 4': {'x': 200, 'y': 710}}
        const bottomItemCoordinates = {'Item 2' : {'x': 200 , 'y': 550}, 'Item 4': {'x': 200, 'y': 590}, 
        'Item 5': {'x': 200, 'y': 630}, 'Item 6': {'x': 200, 'y': 670}, 
        'Item 8': {'x': 200, 'y': 710}};
        const topItems = ['Item 3', 'Item 7', 'Item 1', 'Item 2', 'Item 4'];
        const bottomItems = ['Item 2', 'Item 4', 'Item 5', 'Item 6', 'Item 8'];


        function upScroll(){
            return driver.action('pointer', {parameters: {pointerType: 'touch'}})
            .move({duration : 100, x: 200 , y: 560})
            .down({button: 0})
            .move({duration : 500, x: 200 , y: 720})
            .up({button: 0});
        }
        function downScroll(){
            return driver.action('pointer', {parameters: {pointerType: 'touch'}})
            .move({duration : 100, x: 200 , y: 720})
            .down({button: 0})
            .move({duration : 500, x: 200 , y: 560})
            .up({button: 0});
        }

        function clickItem(itemCoordinates){
            return driver.action('pointer', {parameters: {pointerType: 'touch'}})
            .move({duration : 100, x: itemCoordinates['x'] , y: itemCoordinates['y']})
            .down({button: 0})
            .up({button: 0});
        }

        function clickSelector(){
            return driver.action('pointer', {parameters: {pointerType: 'touch'}})
            .move({duration : 100, x: 200 , y: 750})
            .down({button: 0})
            .up({button: 0});
        }

        function clickScreen(){
            return driver.action('pointer', {parameters: {pointerType: 'touch'}})
            .move({duration : 100, x: 200 , y: 400})
            .down({button: 0})
            .up({button: 0});
        }

        beforeEach(async () => {
            await driver.pause(1500);
            await clickSelector().perform();
            await driver.pause(2000);
        })

        function selectAndScrollTest(items, itemCoordinates){
            for(let i = 0; i < items.length; i++){
                var top = true;
                
            }
        }
    })
})