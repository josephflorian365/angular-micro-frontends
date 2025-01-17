import {
  Component,
  createNgModuleRef,
  Injector,
  NgModule,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {SharedMfeModule} from '@angular-mfe/shared';

@Component({
  template: `
    <h1>Caosa me llegas al chompi</h1>
    <ng-container #vc></ng-container>
  `,
  selector: 'host-mfe'
})
export class HostMfeComponent {
  @ViewChild('vc', {read: ViewContainerRef})
  vc: ViewContainerRef;


  constructor(readonly injector: Injector) {
    (<any>window).hostMfe = this;
  }

  /**
   * Creates a components and inserts it into the container
   * @param path Path to the angular mfe
   */
  loadMfe(path: string): void {
    import(path).then(mfe =>
      this.vc.createComponent(
        createNgModuleRef(mfe.ngModule, this.injector)
          .componentFactoryResolver
          .resolveComponentFactory(mfe.EntryComponent)
      )
    )
  }
}

@NgModule({
  declarations: [HostMfeComponent],
  imports: [BrowserModule, SharedMfeModule],
  bootstrap: [HostMfeComponent]
})
export class ModuleMfeModule {
}
