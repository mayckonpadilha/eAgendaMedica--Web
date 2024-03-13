import { Directive, ElementRef, HostListener, Renderer2 } from "@angular/core"

@Directive({
     selector:'[appCardHover]',
})

export class CardHoverDirective{
   
   constructor(private  elemento: ElementRef,private renderer:Renderer2){}


    @HostListener('mouseenter') 

    onMouseEnter(){
        this.renderer.setStyle(this.elemento.nativeElement,'cursor','pointer')
        
        this.renderer.setStyle(this.elemento.nativeElement,'  background-size', '0 0.1em, 100% 0.1em')

        this.renderer.addClass(this.elemento.nativeElement, 'mat-mdc-elevation-specific')

        this.renderer.addClass(this.elemento.nativeElement, 'mat-elevation-z15')
    }

    @HostListener('mouseleave')

    onMouseLeave(){
        this.renderer.removeClass(this.elemento.nativeElement, 'mat-mdc-elevation-specific')

        this.renderer.removeClass(this.elemento.nativeElement, 'mat-elevation-z15')
    }
}