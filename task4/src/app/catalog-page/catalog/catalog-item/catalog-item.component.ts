import { Component, Input, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver, ComponentRef, OnDestroy } from '@angular/core';
import { FilmItemComponent } from '../../film-item/film-item.component';

@Component({
    selector: 'app-catalog-item',
    templateUrl: './catalog-item.component.html',
    styleUrls: ['./catalog-item.component.css']
})

export class CatalogItemComponent implements OnInit, OnDestroy {
    @ViewChild('container', {read: ViewContainerRef})
    container: ViewContainerRef;

    @Input()
    component: any;
    @Input()
    data: object;

    private componentRef: any;

    constructor(private componentFactoryResolver: ComponentFactoryResolver) {
    }

    ngOnInit() {
        const factory = this.componentFactoryResolver.resolveComponentFactory(this.component);
        this.componentRef = this.container.createComponent(factory);
        this.componentRef.instance.data = this.data;
    }

    ngOnDestroy() {
        if (this.componentRef) {
            this.componentRef.destroy();
            this.componentRef = null;
        }
    }
}
