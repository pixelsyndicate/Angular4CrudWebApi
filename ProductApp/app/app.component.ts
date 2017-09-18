import { Component } from '@angular/core';

// THIS IS THE 'CODE BEHIND' FOR THE APP.COMPONENT.HTML
@Component({
    moduleId: module.id, // helps angular understand relative paths
    selector: 'my-app', // the <tag> we are going to replace
    templateUrl: 'app.component.html', // defines the UI for this component
    // could have inline HTML here like `<div>Hello World</div>`
})
export class AppComponent {
    pageTitle = 'Product Application'; // a parameter value in the html as {{pageTitle}}
}
