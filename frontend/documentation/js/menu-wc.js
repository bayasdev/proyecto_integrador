'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">client documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-d10659d39ea3b0f0e64d06c3caec964c7f4b3e95c52987270099bd41312c1f37437e70c0a665ee61ec272e9a9dc98211dd486e69eeac08b9cbfd164419ffb17d"' : 'data-target="#xs-components-links-module-AppModule-d10659d39ea3b0f0e64d06c3caec964c7f4b3e95c52987270099bd41312c1f37437e70c0a665ee61ec272e9a9dc98211dd486e69eeac08b9cbfd164419ffb17d"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-d10659d39ea3b0f0e64d06c3caec964c7f4b3e95c52987270099bd41312c1f37437e70c0a665ee61ec272e9a9dc98211dd486e69eeac08b9cbfd164419ffb17d"' :
                                            'id="xs-components-links-module-AppModule-d10659d39ea3b0f0e64d06c3caec964c7f4b3e95c52987270099bd41312c1f37437e70c0a665ee61ec272e9a9dc98211dd486e69eeac08b9cbfd164419ffb17d"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link" >AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/BlankPageModule.html" data-type="entity-link" >BlankPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-BlankPageModule-83a56332e5b4b138ebb0078214cd657e64e87821970cec35525c071dc62374eedc050afd416f8a447b4d8076d70ce45397e2628a171dbe4e53d311341e526ffc"' : 'data-target="#xs-components-links-module-BlankPageModule-83a56332e5b4b138ebb0078214cd657e64e87821970cec35525c071dc62374eedc050afd416f8a447b4d8076d70ce45397e2628a171dbe4e53d311341e526ffc"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-BlankPageModule-83a56332e5b4b138ebb0078214cd657e64e87821970cec35525c071dc62374eedc050afd416f8a447b4d8076d70ce45397e2628a171dbe4e53d311341e526ffc"' :
                                            'id="xs-components-links-module-BlankPageModule-83a56332e5b4b138ebb0078214cd657e64e87821970cec35525c071dc62374eedc050afd416f8a447b4d8076d70ce45397e2628a171dbe4e53d311341e526ffc"' }>
                                            <li class="link">
                                                <a href="components/BlankPageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BlankPageComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/BlankPageRoutingModule.html" data-type="entity-link" >BlankPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/CareersPageModule.html" data-type="entity-link" >CareersPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-CareersPageModule-7a82a8a4a896b67eed0c3367c1068f1de33d5a6d43c7b22faa6533a18b62441537a52141048119406f5d4842b144f696d7a93dfcada4939ea5abd09f2538b207"' : 'data-target="#xs-components-links-module-CareersPageModule-7a82a8a4a896b67eed0c3367c1068f1de33d5a6d43c7b22faa6533a18b62441537a52141048119406f5d4842b144f696d7a93dfcada4939ea5abd09f2538b207"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-CareersPageModule-7a82a8a4a896b67eed0c3367c1068f1de33d5a6d43c7b22faa6533a18b62441537a52141048119406f5d4842b144f696d7a93dfcada4939ea5abd09f2538b207"' :
                                            'id="xs-components-links-module-CareersPageModule-7a82a8a4a896b67eed0c3367c1068f1de33d5a6d43c7b22faa6533a18b62441537a52141048119406f5d4842b144f696d7a93dfcada4939ea5abd09f2538b207"' }>
                                            <li class="link">
                                                <a href="components/CareersPageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CareersPageComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/CareersPageRoutingModule.html" data-type="entity-link" >CareersPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/DashboardPageModule.html" data-type="entity-link" >DashboardPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-DashboardPageModule-6018f1e4f883773edd35817b00399abf96a8d1b90f3b628b182999aa3cbdc0c9e32792af9ae635a5b3874ebad66f954d35cca11c4bddb7a86b8ca5163f3d0838"' : 'data-target="#xs-components-links-module-DashboardPageModule-6018f1e4f883773edd35817b00399abf96a8d1b90f3b628b182999aa3cbdc0c9e32792af9ae635a5b3874ebad66f954d35cca11c4bddb7a86b8ca5163f3d0838"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-DashboardPageModule-6018f1e4f883773edd35817b00399abf96a8d1b90f3b628b182999aa3cbdc0c9e32792af9ae635a5b3874ebad66f954d35cca11c4bddb7a86b8ca5163f3d0838"' :
                                            'id="xs-components-links-module-DashboardPageModule-6018f1e4f883773edd35817b00399abf96a8d1b90f3b628b182999aa3cbdc0c9e32792af9ae635a5b3874ebad66f954d35cca11c4bddb7a86b8ca5163f3d0838"' }>
                                            <li class="link">
                                                <a href="components/DashboardPageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DashboardPageComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/DashboardPageRoutingModule.html" data-type="entity-link" >DashboardPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/DeniedPageModule.html" data-type="entity-link" >DeniedPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-DeniedPageModule-8e4fb89492650072123482da9ffa980525fbb2418542fcca70f45115011b2bf52f306efe384a4db348a3d588bf3c90c293a69e4fbbe1aa4b69a62a148aafde0c"' : 'data-target="#xs-components-links-module-DeniedPageModule-8e4fb89492650072123482da9ffa980525fbb2418542fcca70f45115011b2bf52f306efe384a4db348a3d588bf3c90c293a69e4fbbe1aa4b69a62a148aafde0c"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-DeniedPageModule-8e4fb89492650072123482da9ffa980525fbb2418542fcca70f45115011b2bf52f306efe384a4db348a3d588bf3c90c293a69e4fbbe1aa4b69a62a148aafde0c"' :
                                            'id="xs-components-links-module-DeniedPageModule-8e4fb89492650072123482da9ffa980525fbb2418542fcca70f45115011b2bf52f306efe384a4db348a3d588bf3c90c293a69e4fbbe1aa4b69a62a148aafde0c"' }>
                                            <li class="link">
                                                <a href="components/DeniedPageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DeniedPageComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/DeniedPageRoutingModule.html" data-type="entity-link" >DeniedPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/FacultiesPageModule.html" data-type="entity-link" >FacultiesPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-FacultiesPageModule-fd4a983a41620b5952a78ebf9047a9cead15b63fac56d174fba1137dbf45d33d67e1ae3c23727de2d728ab8ea05934d16ae23efb48f2e806d2cd434aa0f6b860"' : 'data-target="#xs-components-links-module-FacultiesPageModule-fd4a983a41620b5952a78ebf9047a9cead15b63fac56d174fba1137dbf45d33d67e1ae3c23727de2d728ab8ea05934d16ae23efb48f2e806d2cd434aa0f6b860"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-FacultiesPageModule-fd4a983a41620b5952a78ebf9047a9cead15b63fac56d174fba1137dbf45d33d67e1ae3c23727de2d728ab8ea05934d16ae23efb48f2e806d2cd434aa0f6b860"' :
                                            'id="xs-components-links-module-FacultiesPageModule-fd4a983a41620b5952a78ebf9047a9cead15b63fac56d174fba1137dbf45d33d67e1ae3c23727de2d728ab8ea05934d16ae23efb48f2e806d2cd434aa0f6b860"' }>
                                            <li class="link">
                                                <a href="components/FacultiesPageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FacultiesPageComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/FacultiesPageRoutingModule.html" data-type="entity-link" >FacultiesPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/LayoutModule.html" data-type="entity-link" >LayoutModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-LayoutModule-b9ae0323d1aa05ed9db9468b21746c56e8a4f229cf084c8c84606f3100ca7bb6749f937d26ea16490bb951a76a4c67502df69f91e2c0b61064b7771de0361204"' : 'data-target="#xs-components-links-module-LayoutModule-b9ae0323d1aa05ed9db9468b21746c56e8a4f229cf084c8c84606f3100ca7bb6749f937d26ea16490bb951a76a4c67502df69f91e2c0b61064b7771de0361204"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-LayoutModule-b9ae0323d1aa05ed9db9468b21746c56e8a4f229cf084c8c84606f3100ca7bb6749f937d26ea16490bb951a76a4c67502df69f91e2c0b61064b7771de0361204"' :
                                            'id="xs-components-links-module-LayoutModule-b9ae0323d1aa05ed9db9468b21746c56e8a4f229cf084c8c84606f3100ca7bb6749f937d26ea16490bb951a76a4c67502df69f91e2c0b61064b7771de0361204"' }>
                                            <li class="link">
                                                <a href="components/LayoutComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LayoutComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NavbarComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NavbarComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SidebarComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SidebarComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-LayoutModule-b9ae0323d1aa05ed9db9468b21746c56e8a4f229cf084c8c84606f3100ca7bb6749f937d26ea16490bb951a76a4c67502df69f91e2c0b61064b7771de0361204"' : 'data-target="#xs-injectables-links-module-LayoutModule-b9ae0323d1aa05ed9db9468b21746c56e8a4f229cf084c8c84606f3100ca7bb6749f937d26ea16490bb951a76a4c67502df69f91e2c0b61064b7771de0361204"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-LayoutModule-b9ae0323d1aa05ed9db9468b21746c56e8a4f229cf084c8c84606f3100ca7bb6749f937d26ea16490bb951a76a4c67502df69f91e2c0b61064b7771de0361204"' :
                                        'id="xs-injectables-links-module-LayoutModule-b9ae0323d1aa05ed9db9468b21746c56e8a4f229cf084c8c84606f3100ca7bb6749f937d26ea16490bb951a76a4c67502df69f91e2c0b61064b7771de0361204"' }>
                                        <li class="link">
                                            <a href="injectables/CatalogService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CatalogService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/LayoutRoutingModule.html" data-type="entity-link" >LayoutRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/LoginPageModule.html" data-type="entity-link" >LoginPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-LoginPageModule-6b802e2ed22551a8003fa3fb08edc4faa94d9d9be7e5c33a805b54434d19bd6956854a4b9a788235e49c24e4adea51d08b6c0ceaafdcf6038694521ec857cbd3"' : 'data-target="#xs-components-links-module-LoginPageModule-6b802e2ed22551a8003fa3fb08edc4faa94d9d9be7e5c33a805b54434d19bd6956854a4b9a788235e49c24e4adea51d08b6c0ceaafdcf6038694521ec857cbd3"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-LoginPageModule-6b802e2ed22551a8003fa3fb08edc4faa94d9d9be7e5c33a805b54434d19bd6956854a4b9a788235e49c24e4adea51d08b6c0ceaafdcf6038694521ec857cbd3"' :
                                            'id="xs-components-links-module-LoginPageModule-6b802e2ed22551a8003fa3fb08edc4faa94d9d9be7e5c33a805b54434d19bd6956854a4b9a788235e49c24e4adea51d08b6c0ceaafdcf6038694521ec857cbd3"' }>
                                            <li class="link">
                                                <a href="components/AuthComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LoginPageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LoginPageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PasswordRecoveryComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PasswordRecoveryComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RegisterComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RegisterComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-LoginPageModule-6b802e2ed22551a8003fa3fb08edc4faa94d9d9be7e5c33a805b54434d19bd6956854a4b9a788235e49c24e4adea51d08b6c0ceaafdcf6038694521ec857cbd3"' : 'data-target="#xs-injectables-links-module-LoginPageModule-6b802e2ed22551a8003fa3fb08edc4faa94d9d9be7e5c33a805b54434d19bd6956854a4b9a788235e49c24e4adea51d08b6c0ceaafdcf6038694521ec857cbd3"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-LoginPageModule-6b802e2ed22551a8003fa3fb08edc4faa94d9d9be7e5c33a805b54434d19bd6956854a4b9a788235e49c24e4adea51d08b6c0ceaafdcf6038694521ec857cbd3"' :
                                        'id="xs-injectables-links-module-LoginPageModule-6b802e2ed22551a8003fa3fb08edc4faa94d9d9be7e5c33a805b54434d19bd6956854a4b9a788235e49c24e4adea51d08b6c0ceaafdcf6038694521ec857cbd3"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/LoginPageRoutingModule.html" data-type="entity-link" >LoginPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/NewRequestPageModule.html" data-type="entity-link" >NewRequestPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-NewRequestPageModule-886f8dd212f6bfddfb37b501346cb9eff24ce8ae6a85f538afa005fee66695c88928745eec0943635ecfb41d68e7eeb6fca94c4d1194d14672a7d75df1e801d6"' : 'data-target="#xs-components-links-module-NewRequestPageModule-886f8dd212f6bfddfb37b501346cb9eff24ce8ae6a85f538afa005fee66695c88928745eec0943635ecfb41d68e7eeb6fca94c4d1194d14672a7d75df1e801d6"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-NewRequestPageModule-886f8dd212f6bfddfb37b501346cb9eff24ce8ae6a85f538afa005fee66695c88928745eec0943635ecfb41d68e7eeb6fca94c4d1194d14672a7d75df1e801d6"' :
                                            'id="xs-components-links-module-NewRequestPageModule-886f8dd212f6bfddfb37b501346cb9eff24ce8ae6a85f538afa005fee66695c88928745eec0943635ecfb41d68e7eeb6fca94c4d1194d14672a7d75df1e801d6"' }>
                                            <li class="link">
                                                <a href="components/NewRequestPageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NewRequestPageComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/NewRequestPageRoutingModule.html" data-type="entity-link" >NewRequestPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/NotFoundPageModule.html" data-type="entity-link" >NotFoundPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-NotFoundPageModule-85f651e494b7498f130ec128c4a432a0d81c56340a29f4d168dbe4891e200ca54029dc91423e8b6da7d3fa8d50be5758452a47497bec401d3865d3e91897fcd4"' : 'data-target="#xs-components-links-module-NotFoundPageModule-85f651e494b7498f130ec128c4a432a0d81c56340a29f4d168dbe4891e200ca54029dc91423e8b6da7d3fa8d50be5758452a47497bec401d3865d3e91897fcd4"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-NotFoundPageModule-85f651e494b7498f130ec128c4a432a0d81c56340a29f4d168dbe4891e200ca54029dc91423e8b6da7d3fa8d50be5758452a47497bec401d3865d3e91897fcd4"' :
                                            'id="xs-components-links-module-NotFoundPageModule-85f651e494b7498f130ec128c4a432a0d81c56340a29f4d168dbe4891e200ca54029dc91423e8b6da7d3fa8d50be5758452a47497bec401d3865d3e91897fcd4"' }>
                                            <li class="link">
                                                <a href="components/NotFoundPageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NotFoundPageComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/NotFoundPageRoutingModule.html" data-type="entity-link" >NotFoundPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/PasswordRecoveryPageModule.html" data-type="entity-link" >PasswordRecoveryPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-PasswordRecoveryPageModule-85ec33ee1268bb783bf59091e5a4b74cdf438f2c23adbbbff269cf989e617ad7d30a5afa661282a7ef1edd10efa9cf1dc29232323fe5f38045cddde34304247e"' : 'data-target="#xs-components-links-module-PasswordRecoveryPageModule-85ec33ee1268bb783bf59091e5a4b74cdf438f2c23adbbbff269cf989e617ad7d30a5afa661282a7ef1edd10efa9cf1dc29232323fe5f38045cddde34304247e"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-PasswordRecoveryPageModule-85ec33ee1268bb783bf59091e5a4b74cdf438f2c23adbbbff269cf989e617ad7d30a5afa661282a7ef1edd10efa9cf1dc29232323fe5f38045cddde34304247e"' :
                                            'id="xs-components-links-module-PasswordRecoveryPageModule-85ec33ee1268bb783bf59091e5a4b74cdf438f2c23adbbbff269cf989e617ad7d30a5afa661282a7ef1edd10efa9cf1dc29232323fe5f38045cddde34304247e"' }>
                                            <li class="link">
                                                <a href="components/PasswordRecoveryPageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PasswordRecoveryPageComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/PasswordRecoveryPageRoutingModule.html" data-type="entity-link" >PasswordRecoveryPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/ProfilePageModule.html" data-type="entity-link" >ProfilePageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ProfilePageModule-a89590be667733fb37ce4c2f919da492d4b0845fa449032d23dc632a8a3e60ea392b0b34285cdb72f6f8f6bcfd93d9e50f5d09eaf9de1e381c3362b5b729d0ed"' : 'data-target="#xs-components-links-module-ProfilePageModule-a89590be667733fb37ce4c2f919da492d4b0845fa449032d23dc632a8a3e60ea392b0b34285cdb72f6f8f6bcfd93d9e50f5d09eaf9de1e381c3362b5b729d0ed"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ProfilePageModule-a89590be667733fb37ce4c2f919da492d4b0845fa449032d23dc632a8a3e60ea392b0b34285cdb72f6f8f6bcfd93d9e50f5d09eaf9de1e381c3362b5b729d0ed"' :
                                            'id="xs-components-links-module-ProfilePageModule-a89590be667733fb37ce4c2f919da492d4b0845fa449032d23dc632a8a3e60ea392b0b34285cdb72f6f8f6bcfd93d9e50f5d09eaf9de1e381c3362b5b729d0ed"' }>
                                            <li class="link">
                                                <a href="components/ProfilePageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProfilePageComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-ProfilePageModule-a89590be667733fb37ce4c2f919da492d4b0845fa449032d23dc632a8a3e60ea392b0b34285cdb72f6f8f6bcfd93d9e50f5d09eaf9de1e381c3362b5b729d0ed"' : 'data-target="#xs-injectables-links-module-ProfilePageModule-a89590be667733fb37ce4c2f919da492d4b0845fa449032d23dc632a8a3e60ea392b0b34285cdb72f6f8f6bcfd93d9e50f5d09eaf9de1e381c3362b5b729d0ed"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ProfilePageModule-a89590be667733fb37ce4c2f919da492d4b0845fa449032d23dc632a8a3e60ea392b0b34285cdb72f6f8f6bcfd93d9e50f5d09eaf9de1e381c3362b5b729d0ed"' :
                                        'id="xs-injectables-links-module-ProfilePageModule-a89590be667733fb37ce4c2f919da492d4b0845fa449032d23dc632a8a3e60ea392b0b34285cdb72f6f8f6bcfd93d9e50f5d09eaf9de1e381c3362b5b729d0ed"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ProfilePageRoutingModule.html" data-type="entity-link" >ProfilePageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/RequestsPageModule.html" data-type="entity-link" >RequestsPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-RequestsPageModule-3392ebac545591ce5de65f164895bef5300bb49bfb70fd57ed5a7708b8e17fe965c6924db4bc31af274d7578b1e29073a98612b7b6a49c214d91d810abe814ef"' : 'data-target="#xs-components-links-module-RequestsPageModule-3392ebac545591ce5de65f164895bef5300bb49bfb70fd57ed5a7708b8e17fe965c6924db4bc31af274d7578b1e29073a98612b7b6a49c214d91d810abe814ef"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-RequestsPageModule-3392ebac545591ce5de65f164895bef5300bb49bfb70fd57ed5a7708b8e17fe965c6924db4bc31af274d7578b1e29073a98612b7b6a49c214d91d810abe814ef"' :
                                            'id="xs-components-links-module-RequestsPageModule-3392ebac545591ce5de65f164895bef5300bb49bfb70fd57ed5a7708b8e17fe965c6924db4bc31af274d7578b1e29073a98612b7b6a49c214d91d810abe814ef"' }>
                                            <li class="link">
                                                <a href="components/RequestsPageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RequestsPageComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/RequestsPageRoutingModule.html" data-type="entity-link" >RequestsPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/RequestViewerPageModule.html" data-type="entity-link" >RequestViewerPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-RequestViewerPageModule-45c64a967321a4b1d5e81bb076f8edb9a74eb86d96143296630fa02e1c6eea0357c3959a9105a392b182ce17e70e992609554b50d986142ad805f5648761701e"' : 'data-target="#xs-components-links-module-RequestViewerPageModule-45c64a967321a4b1d5e81bb076f8edb9a74eb86d96143296630fa02e1c6eea0357c3959a9105a392b182ce17e70e992609554b50d986142ad805f5648761701e"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-RequestViewerPageModule-45c64a967321a4b1d5e81bb076f8edb9a74eb86d96143296630fa02e1c6eea0357c3959a9105a392b182ce17e70e992609554b50d986142ad805f5648761701e"' :
                                            'id="xs-components-links-module-RequestViewerPageModule-45c64a967321a4b1d5e81bb076f8edb9a74eb86d96143296630fa02e1c6eea0357c3959a9105a392b182ce17e70e992609554b50d986142ad805f5648761701e"' }>
                                            <li class="link">
                                                <a href="components/RequestViewerPageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RequestViewerPageComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/RequestViewerPageRoutingModule.html" data-type="entity-link" >RequestViewerPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/SubjectsPageModule.html" data-type="entity-link" >SubjectsPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-SubjectsPageModule-ffe259b3db3d33ed6a080a891897c6a8f9c14ed9a5f40bee1dd7755648d9f1584b8cffa988d1eb3a54f690b5809eff59cbad400b6043b7fb2b0e781451f42ce8"' : 'data-target="#xs-components-links-module-SubjectsPageModule-ffe259b3db3d33ed6a080a891897c6a8f9c14ed9a5f40bee1dd7755648d9f1584b8cffa988d1eb3a54f690b5809eff59cbad400b6043b7fb2b0e781451f42ce8"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SubjectsPageModule-ffe259b3db3d33ed6a080a891897c6a8f9c14ed9a5f40bee1dd7755648d9f1584b8cffa988d1eb3a54f690b5809eff59cbad400b6043b7fb2b0e781451f42ce8"' :
                                            'id="xs-components-links-module-SubjectsPageModule-ffe259b3db3d33ed6a080a891897c6a8f9c14ed9a5f40bee1dd7755648d9f1584b8cffa988d1eb3a54f690b5809eff59cbad400b6043b7fb2b0e781451f42ce8"' }>
                                            <li class="link">
                                                <a href="components/SubjectsPageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SubjectsPageComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/SubjectsPageRoutingModule.html" data-type="entity-link" >SubjectsPageRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/UsersPageModule.html" data-type="entity-link" >UsersPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-UsersPageModule-1da8c454c011c04b7c4acd18b9eef91c3cef0c3cbc8356253077ba8048ef9428820d6b34c5404b6b52110c73c9d07ae184f2004997f0f67a6c1dd75f2de318c7"' : 'data-target="#xs-components-links-module-UsersPageModule-1da8c454c011c04b7c4acd18b9eef91c3cef0c3cbc8356253077ba8048ef9428820d6b34c5404b6b52110c73c9d07ae184f2004997f0f67a6c1dd75f2de318c7"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-UsersPageModule-1da8c454c011c04b7c4acd18b9eef91c3cef0c3cbc8356253077ba8048ef9428820d6b34c5404b6b52110c73c9d07ae184f2004997f0f67a6c1dd75f2de318c7"' :
                                            'id="xs-components-links-module-UsersPageModule-1da8c454c011c04b7c4acd18b9eef91c3cef0c3cbc8356253077ba8048ef9428820d6b34c5404b6b52110c73c9d07ae184f2004997f0f67a6c1dd75f2de318c7"' }>
                                            <li class="link">
                                                <a href="components/UsersPageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersPageComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersPageRoutingModule.html" data-type="entity-link" >UsersPageRoutingModule</a>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CareerService.html" data-type="entity-link" >CareerService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CatalogService.html" data-type="entity-link" >CatalogService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DeanService.html" data-type="entity-link" >DeanService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DirectorService.html" data-type="entity-link" >DirectorService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FacultyService.html" data-type="entity-link" >FacultyService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RequestAttachmentService.html" data-type="entity-link" >RequestAttachmentService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RequestService.html" data-type="entity-link" >RequestService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/SubjectService.html" data-type="entity-link" >SubjectService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserService.html" data-type="entity-link" >UserService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AuthGuard.html" data-type="entity-link" >AuthGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/RoleGuard.html" data-type="entity-link" >RoleGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});