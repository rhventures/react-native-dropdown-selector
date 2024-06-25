class startingScreen {
    get dropDownSelector(){
        return $('-android uiautomator:new UiSelector().text(\"ᨆ\").instance(2)');
    }

    get Item3(){
        return $('~Item 3');
    }

    get selectedItemText(){
        return $('//android.widget.TextView[@text="Selected: Item 3 (scroll down)"]');
    }

    // async selectItem3(){
    //     await this.dropDownSelector.click();
    //     await this.Item3.click();
    // }
}
