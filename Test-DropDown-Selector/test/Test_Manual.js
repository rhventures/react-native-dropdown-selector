describe("Click Me Demo", () => {
    beforeEach(async () => { //setting the condition
        //click the dropdown menu bar
        const selector = 'new UiSelector().text("ᨆ").instance(0)';
        const selectorUI = await $(`android=${selector}`);
        selectorUI.click();

        //await driver.pause(3000);
    })
    
    it("should show item 3 selected", async () => {
        //click item 3
        await $('~Item 3').click();

        const selectedItem = 'new UiSelector().text("Selected: Item 3 (scroll down)")'
        const selectedItemUI = await $(`android=${selectedItem}`);
        await expect(selectedItemUI).toHaveText('Selected: Item 3 (scroll down)');

    });

    it("should show item 4 selected", async () => {
        await $('~Item 4').click();

        const selectedItem = 'new UiSelector().text("Selected: Item 4 (scroll down)")'
        const selectedItemUI = await $(`android=${selectedItem}`);
        await expect(selectedItemUI).toHaveText('Selected: Item 4 (scroll down)');

    })

    it("should show item 7 selected", async () => {
        await $('~Item 7').click();

        const selectedItem = 'new UiSelector().text("Selected: Item 7 (scroll down)")'
        const selectedItemUI = await $(`android=${selectedItem}`);
        await expect(selectedItemUI).toHaveText('Selected: Item 7 (scroll down)');

    })

    it("should show item 1 selected", async () => {
        await $('~Item 1').click();

        const selectedItem = 'new UiSelector().text("Selected: Item 1 (scroll down)")'
        const selectedItemUI = await $(`android=${selectedItem}`);
        await expect(selectedItemUI).toHaveText('Selected: Item 1 (scroll down)');

    })

    it("should show item 2 selected", async () => {
        await $('~Item 2').click();

        const selectedItem = 'new UiSelector().text("Selected: Item 2 (scroll down)")'
        const selectedItemUI = await $(`android=${selectedItem}`);
        await expect(selectedItemUI).toHaveText('Selected: Item 2 (scroll down)');

    })
})



