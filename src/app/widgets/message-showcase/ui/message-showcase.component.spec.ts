import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageShowcaseComponent } from './message-showcase.component';

describe('MessageShowcaseComponent', () => {
  let component: MessageShowcaseComponent;
  let fixture: ComponentFixture<MessageShowcaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MessageShowcaseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessageShowcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
