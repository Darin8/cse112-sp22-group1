// Puppeteer
jest.setTimeout(35000);

describe('Basic user flow for SPA ', () => {
    
    beforeAll(async () => {
      await page.goto('http://localhost:8080/login');
      await page.waitForTimeout(1000);
    });


    // Testing test
    test(' 1 and 1', async ()=>{
      expect(1).toBe(1);
    });

    
    
    // Test 1
    it('Test1: Initial Home Page - Check Home Page', async () => {

      // Remember to change this after deploy
      expect(page.url()).toBe("http://localhost:8080/login/");
      
    });

    // Test 2
    it('Create New User Fails', async () => {
      
      // check that alert shows & url
      
        page.on('dialog', async dialog => {
          console.log('here');
          await dialog.accept();
        });
        await page.click('input#login-form-create');
        await page.click('input#email-field');
        await page.type('input#email-field','test10');
        await page.click('input#login-form-create');
        await page.click('input#password-field');
        await page.click('input#login-form-create');
        expect(page.url()).toBe("http://localhost:8080/login/");
    });

    // Test 3
    it('Log in fail', async () => {
        // fill in fields, click login, check link
        //await page.waitForSelector('email-field');   
        await page.click('input#email-field', {clickCount:3});
        await page.type('input#email-field','test10');
        await page.click('input#password-field',{clickCount:3});
        await page.type('input#password-field','qwer3');
        await page.click("input#login-form-submit");
        await page.waitForTimeout(5000);
        expect(page.url()).toBe("http://localhost:8080/login/");
    
        });

    
    /*
    // Test 4
    it('Log in', async () => {
      // fill in fields, click login, check link
      //await page.waitForSelector('email-field');
      await page.click('input#email-field', {clickCount:3});
      await page.type('input#email-field','test3');
      await page.click('input#password-field',{clickCount:3});
      await page.type('input#password-field','qwert');
      await page.click("input#login-form-submit");
      //await page.waitForNavigation();
      await page.waitForTimeout(5000);
      //let pageHeader = document.querySelector("topbar").shadowRoot.querySelector("#inner")


      //console.log(pageHeader.title);

      
    }, 5000);
    */

    //Test 5
    /*
    it('user', async()=>{

    });
    */

    /*
    test('Create Future Log', () => {
      // TODO
    });

    test ('Create Daily Log', () => {

    });

    test ('Change Theme', () => {

    });

  
    */
    
});