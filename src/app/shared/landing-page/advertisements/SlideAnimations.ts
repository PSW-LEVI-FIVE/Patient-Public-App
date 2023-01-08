import { trigger, state, style, transition,
    animate
} from '@angular/animations';

export const SlideAnimations = [
    trigger('slide', [
        state('center',
            style({ 
                transform: 'translateX(0)',
                opacity: 1,
            })),
        state('left',
            style({
                transform: 'translateX(-100%)',
                opacity: 0.5
            })),
        state('right',
            style({
                transform: 'translateX(100%)',
                opacity: 0.5
            })),
        transition('center => right', animate('400ms ease-out')),
        transition('left => center', animate('400ms ease-out')),
        transition('right => center', animate('400ms ease-out')),
        transition('center => left', animate('400ms ease-out')),
        transition('right => left', animate('0ms ease-out')),
        transition('left => right', animate('0ms ease-out')),
    ]),
    trigger(
        'enterAnimation', [
          transition(':enter', [
            style({ opacity: 0}),
            animate('200ms ease-out', style({ opacity: 1}))
          ]),
          transition(':leave', [
            style({ opacity: 1}),
            animate('200ms ease-out', style({ opacity: 0}))
          ])
        ]
      )
]