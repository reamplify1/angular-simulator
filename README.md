# AngularSimulator

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.0.5.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.


```
angular-simulator
├─ .angular
├─ .editorconfig
├─ .prettierrc
├─ angular.json
├─ eslint.config.js
├─ homework-27.md
├─ package-lock.json
├─ package.json
├─ public
│  ├─ favicon.ico
│  ├─ i18n
│  │  ├─ en.json
│  │  ├─ kk.json
│  │  └─ ru.json
│  └─ images
│     ├─ about-tour1.png
│     ├─ about-tour2.png
│     ├─ bg-mountains.jpg
│     ├─ icons
│     │  ├─ arrow-down.svg
│     │  ├─ arrow-icon.svg
│     │  ├─ calendar-icon.svg
│     │  ├─ close-message-icon.svg
│     │  ├─ footer-logos
│     │  │  ├─ pinterest-icon.svg
│     │  │  ├─ skype-icon.svg
│     │  │  ├─ telegram-icon.svg
│     │  │  └─ vk-icon.svg
│     │  ├─ info-exp-icon.svg
│     │  ├─ info-prices-icon.svg
│     │  ├─ info-security-icon.svg
│     │  ├─ loading-icon.svg
│     │  ├─ message-icon.svg
│     │  ├─ play-icon.svg
│     │  ├─ rating-star-icon.svg
│     │  ├─ refresh-icon.svg
│     │  └─ search-icon.svg
│     ├─ info-program-img1.png
│     ├─ info-program-img2.png
│     ├─ info-program-img3.png
│     ├─ info-program-img4.png
│     ├─ logo-mountain.svg
│     ├─ photo-blog-balloons.png
│     ├─ photo-blog-boat.png
│     ├─ photo-blog-canyon.png
│     ├─ photo-blog-map.png
│     ├─ photo-blog-ocean.png
│     ├─ photo-blog-table.png
│     ├─ popular_tour1.png
│     ├─ popular_tour2.png
│     ├─ popular_tour3.png
│     ├─ traveler-blog1.png
│     ├─ traveler-blog2.png
│     ├─ traveler-blog3.png
│     └─ traveler-blog4.png
├─ README.md
├─ src
│  ├─ app
│  │  ├─ app.component.html
│  │  ├─ app.component.scss
│  │  ├─ app.component.ts
│  │  ├─ app.config.ts
│  │  ├─ app.routes.ts
│  │  ├─ collection.ts
│  │  ├─ core
│  │  │  ├─ auth
│  │  │  │  ├─ auth-api.service.ts
│  │  │  │  ├─ auth.guard.ts
│  │  │  │  ├─ auth.interceptor.ts
│  │  │  │  └─ auth.service.ts
│  │  │  ├─ footer
│  │  │  │  ├─ footer.component.html
│  │  │  │  ├─ footer.component.scss
│  │  │  │  └─ footer.component.ts
│  │  │  ├─ guards
│  │  │  │  └─ admin.guard.ts
│  │  │  ├─ header
│  │  │  │  ├─ header.component.html
│  │  │  │  ├─ header.component.scss
│  │  │  │  ├─ header.component.ts
│  │  │  │  └─ interfaces
│  │  │  │     └─ INavigation.ts
│  │  │  ├─ interceptors
│  │  │  │  ├─ error.interceptor.ts
│  │  │  │  └─ logging.interceptor.ts
│  │  │  ├─ interfaces
│  │  │  │  ├─ IAppConfig.ts
│  │  │  │  ├─ IAuthResponse.ts
│  │  │  │  ├─ IAuthUser.ts
│  │  │  │  ├─ IGradientConfiguration.ts
│  │  │  │  ├─ ILanguage.ts
│  │  │  │  ├─ ILoginRequest.ts
│  │  │  │  ├─ INotification.ts
│  │  │  │  ├─ IRequestInfo.ts
│  │  │  │  └─ IToken.ts
│  │  │  ├─ loader
│  │  │  │  ├─ loader.component.html
│  │  │  │  ├─ loader.component.scss
│  │  │  │  └─ loader.component.ts
│  │  │  ├─ notification
│  │  │  │  ├─ notification.component.html
│  │  │  │  ├─ notification.component.scss
│  │  │  │  └─ notification.component.ts
│  │  │  ├─ presets
│  │  │  │  └─ indigo-preset.ts
│  │  │  ├─ services
│  │  │  │  ├─ language.service.ts
│  │  │  │  ├─ loader.service.ts
│  │  │  │  ├─ local-storage.service.ts
│  │  │  │  ├─ notification.service.ts
│  │  │  │  └─ theme.service.ts
│  │  │  ├─ theme-switcher
│  │  │  │  ├─ interfaces
│  │  │  │  │  └─ ITheme.ts
│  │  │  │  ├─ theme.component.html
│  │  │  │  ├─ theme.component.scss
│  │  │  │  └─ theme.component.ts
│  │  │  ├─ toggle-theme-color.component
│  │  │  │  ├─ dark-mode-toggle.html
│  │  │  │  └─ dark-mode-toggle.ts
│  │  │  └─ tokens
│  │  │     ├─ app-config.token.ts
│  │  │     └─ date-format.token.ts
│  │  ├─ features
│  │  │  └─ auth
│  │  │     └─ login
│  │  │        ├─ login.component.html
│  │  │        ├─ login.component.scss
│  │  │        └─ login.component.ts
│  │  ├─ layouts
│  │  │  ├─ auth-layout
│  │  │  │  ├─ auth-layout.component.html
│  │  │  │  ├─ auth-layout.component.scss
│  │  │  │  └─ auth-layout.component.ts
│  │  │  └─ main-layout
│  │  │     ├─ main-layout.component.html
│  │  │     ├─ main-layout.component.scss
│  │  │     └─ main-layout.component.ts
│  │  ├─ pages
│  │  │  ├─ home-page
│  │  │  │  ├─ data
│  │  │  │  │  ├─ advantages.ts
│  │  │  │  │  ├─ blog-articles.ts
│  │  │  │  │  ├─ locations.ts
│  │  │  │  │  └─ tours.ts
│  │  │  │  ├─ home-page.component.html
│  │  │  │  ├─ home-page.component.scss
│  │  │  │  ├─ home-page.component.ts
│  │  │  │  └─ interfaces
│  │  │  │     ├─ IAdvantage.ts
│  │  │  │     ├─ IArticle.ts
│  │  │  │     ├─ IBlogArticle.ts
│  │  │  │     ├─ ILocation.ts
│  │  │  │     └─ ITour.ts
│  │  │  ├─ not-found-page
│  │  │  │  ├─ not-found-page.component.html
│  │  │  │  ├─ not-found-page.component.scss
│  │  │  │  └─ not-found-page.component.ts
│  │  │  ├─ posts
│  │  │  │  ├─ components
│  │  │  │  │  ├─ post-create
│  │  │  │  │  │  ├─ post-create.component.html
│  │  │  │  │  │  ├─ post-create.component.scss
│  │  │  │  │  │  └─ post-create.component.ts
│  │  │  │  │  ├─ post-detail
│  │  │  │  │  │  ├─ post-detail.component.html
│  │  │  │  │  │  ├─ post-detail.component.scss
│  │  │  │  │  │  └─ post-detail.component.ts
│  │  │  │  │  └─ post-edit-dialog
│  │  │  │  │     ├─ post-edit-dialog.component.html
│  │  │  │  │     ├─ post-edit-dialog.component.scss
│  │  │  │  │     └─ post-edit-dialog.component.ts
│  │  │  │  ├─ interfaces
│  │  │  │  │  ├─ IContextMenu.ts
│  │  │  │  │  ├─ IPost.ts
│  │  │  │  │  ├─ IPostCreateForm.ts
│  │  │  │  │  ├─ IPostEditForm.ts
│  │  │  │  │  ├─ IPostEditRequest.ts
│  │  │  │  │  └─ IPostsResponse.ts
│  │  │  │  ├─ post-api.service.ts
│  │  │  │  ├─ post.resolver.ts
│  │  │  │  ├─ post.service.ts
│  │  │  │  ├─ posts.component.html
│  │  │  │  ├─ posts.component.scss
│  │  │  │  └─ posts.component.ts
│  │  │  └─ users
│  │  │     ├─ components
│  │  │     │  ├─ search
│  │  │     │  │  ├─ users-filter.component.html
│  │  │     │  │  ├─ users-filter.component.scss
│  │  │     │  │  └─ users-filter.component.ts
│  │  │     │  ├─ user-card
│  │  │     │  │  ├─ user-card.component.html
│  │  │     │  │  ├─ user-card.component.scss
│  │  │     │  │  └─ user-card.component.ts
│  │  │     │  └─ user-create
│  │  │     │     ├─ user-create.component.html
│  │  │     │     ├─ user-create.component.scss
│  │  │     │     └─ user-create.component.ts
│  │  │     ├─ interfaces
│  │  │     │  └─ IUser.ts
│  │  │     ├─ services
│  │  │     │  ├─ user-api.service.ts
│  │  │     │  └─ user.service.ts
│  │  │     ├─ users.component.html
│  │  │     ├─ users.component.scss
│  │  │     └─ users.component.ts
│  │  ├─ shared
│  │  │  ├─ components
│  │  │  ├─ directives
│  │  │  │  ├─ animated-gradient.directive.ts
│  │  │  │  └─ bold-text.directive.ts
│  │  │  └─ pipes
│  │  │     ├─ phone-format.pipe.ts
│  │  │     └─ pluralize.pipe.ts
│  │  ├─ training.ts
│  │  └─ types
│  │     └─ ToFormControls.ts
│  ├─ assets
│  │  ├─ fonts
│  │  │  └─ nunito-sans
│  │  │     ├─ NunitoSans-Italic-VariableFont_YTLC,opsz,wdth,wght.ttf
│  │  │     └─ NunitoSans-VariableFont_YTLC,opsz,wdth,wght.ttf
│  │  ├─ _fonts.scss
│  │  └─ _functions.scss
│  ├─ enums
│  │  ├─ AppTheme.ts
│  │  ├─ Color.ts
│  │  ├─ Language.ts
│  │  ├─ NotificationType.ts
│  │  ├─ PhoneFormat.ts
│  │  └─ UserRole.ts
│  ├─ homework-28
│  │  ├─ child
│  │  │  ├─ child.component.html
│  │  │  ├─ child.component.scss
│  │  │  └─ child.component.ts
│  │  ├─ parent
│  │  │  ├─ parent.component.html
│  │  │  ├─ parent.component.scss
│  │  │  └─ parent.component.ts
│  │  ├─ test-component
│  │  │  ├─ test.component.html
│  │  │  ├─ test.component.scss
│  │  │  └─ test.component.ts
│  │  └─ test-component-second
│  │     ├─ test.component.html
│  │     ├─ test.component.scss
│  │     └─ test.component.ts
│  ├─ index.html
│  ├─ main.ts
│  └─ styles
│     ├─ styles.scss
│     └─ _normalize.css
├─ tsconfig.app.json
├─ tsconfig.json
└─ tsconfig.spec.json

```