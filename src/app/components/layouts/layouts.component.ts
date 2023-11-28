import { AfterViewInit, Component, OnInit } from '@angular/core';

import 
  * as layouts
 from './layouts.model';

import { EventService } from 'src/app/core/services/event.service';

@Component({
  selector: 'app-layouts',
  templateUrl: './layouts.component.html',
  styleUrls: ['./layouts.component.scss']
})
export class LayoutsComponent  implements OnInit, AfterViewInit {
  layoutType!: string;
  layoutwidth!: string;
  topbar!: string;
  mode!: string;
  sidebartype!: string;
constructor(private eventService: EventService){}
  
ngAfterViewInit(): void {
    throw new Error('Method not implemented.');
  }

ngOnInit(){
  this.layoutType = layouts.LAYOUT_VERTICAL;
  // this.layoutType = LAYOUT_HORIZONTAL;
  this.layoutwidth = layouts.LAYOUT_WIDTH;
  this.topbar = layouts.TOPBAR;
  this.mode = layouts.LAYOUT_MODE;
  this.sidebartype = layouts.SIDEBAR_TYPE;

  // document.body.setAttribute('data-layout-mode', this.mode);

  // listen to event and change the layout, theme, etc
  this.eventService.subscribe('changeLayout', (layout) => {
    this.layoutType = layout;
  });

  this.LayoutWidth(this.layoutwidth);

  this.eventService.subscribe('changeWidth', (width) => {
    this.layoutwidth = width;
    this.LayoutWidth(this.layoutwidth);
  });

  // listen to event and change the layout, theme, etc
  this.eventService.subscribe('changeSidebartype', (layout) => {
    this.sidebartype = layout;
    this.changeSidebar(this.sidebartype);
  });

  // Change Mode
  this.eventService.subscribe('changeMode', (mode) => {
    this.mode = mode;
    this.changeMode(this.mode);
  });

  this.changeSidebar(this.sidebartype);
  this.changeMode(this.mode);
}
changeMode(value: any) {    
  switch (value) {
    case "light":
      document.body.setAttribute('data-layout-mode', 'light');
      break;
    case "dark":
      document.body.setAttribute('data-layout-mode', 'dark');
      break;
    default:
      document.body.setAttribute('data-layout-mode', 'light');
      break;
  }
}
changeSidebar(value:any) {
  switch (value) {
    case "light":
      document.body.setAttribute('data-sidebar', 'light');
      document.body.setAttribute('data-topbar', 'dark');
      document.body.removeAttribute('data-sidebar-size');
      document.body.removeAttribute('data-layout-size');
      document.body.removeAttribute('data-keep-enlarged');
      document.body.classList.remove('vertical-collpsed');
      document.body.removeAttribute('data-layout-scrollable');
      break;
    case "compact":
      document.body.setAttribute('data-sidebar-size', 'small');
      document.body.setAttribute('data-sidebar', 'dark');
      document.body.removeAttribute('data-topbar');
      document.body.removeAttribute('data-layout-size');
      document.body.removeAttribute('data-keep-enlarged');
      document.body.classList.remove('sidebar-enable');
      document.body.classList.remove('vertical-collpsed');
      document.body.removeAttribute('data-layout-scrollable');
      break;
    case "dark":
      document.body.setAttribute('data-sidebar', 'dark');
      document.body.removeAttribute('data-topbar');
      document.body.removeAttribute('data-layout-size');
      document.body.removeAttribute('data-keep-enlarged');
      document.body.removeAttribute('data-sidebar-size');
      document.body.classList.remove('sidebar-enable');
      document.body.classList.remove('vertical-collpsed');
      document.body.removeAttribute('data-layout-scrollable');
      break;
    case "icon":
      document.body.classList.add('vertical-collpsed');
      document.body.setAttribute('data-sidebar', 'dark');
      document.body.removeAttribute('data-layout-size');
      document.body.setAttribute('data-keep-enlarged',"true");
      document.body.removeAttribute('data-topbar');
      document.body.removeAttribute('data-layout-scrollable');
      break;
    case "colored":
      document.body.classList.remove('sidebar-enable');
      document.body.classList.remove('vertical-collpsed');
      document.body.setAttribute('data-sidebar', 'colored');
      document.body.removeAttribute('data-layout-size');
      document.body.removeAttribute('data-keep-enlarged');
      document.body.removeAttribute('data-topbar');
      document.body.removeAttribute('data-layout-scrollable');
      document.body.removeAttribute('data-sidebar-size');
      break;
    default:
      document.body.setAttribute('data-sidebar', 'dark');
      break;
  }
}


LayoutWidth(width: string) {
  switch (width) {
    case "fluid":
      document.body.setAttribute("data-layout-size", "fluid");
      document.body.classList.remove("vertical-collpsed");
      document.body.removeAttribute("data-layout-scrollable");
      break;
    case "boxed":
      document.body.setAttribute("data-layout-size", "boxed");
      document.body.classList.add("vertical-collpsed");
      document.body.removeAttribute("data-layout-scrollable");
      break;
    case "scrollable":
      document.body.removeAttribute("data-layout-size");
      document.body.setAttribute("data-layout-scrollable", "true");
      document.body.setAttribute("data-layout-size", "fluid");
      document.body.classList.remove("right-bar-enabled", "vertical-collpsed");
      break;
    default:
      document.body.setAttribute("data-layout-size", "fluid");
      break;
  }
}

/**
 * Check if the vertical layout is requested
 */
isVerticalLayoutRequested() {
  return this.layoutType === layouts.LAYOUT_VERTICAL;
}

/**
 * Check if the horizontal layout is requested
 */
isHorizontalLayoutRequested() {
  return this.layoutType === layouts.LAYOUT_HORIZONTAL;
}
}
