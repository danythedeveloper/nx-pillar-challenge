import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MessagesComponent } from './messages.component';
import { CommonModule } from '@angular/common';
import { MessagesModule } from 'primeng/messages';
import { MessageService } from 'primeng/api';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('MessagesComponent', () => {
  let component: MessagesComponent;
  let fixture: ComponentFixture<MessagesComponent>;
  let messageService: MessageService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, MessagesModule, NoopAnimationsModule],
      declarations: [MessagesComponent],
      providers: [MessageService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MessagesComponent);
    component = fixture.componentInstance;
    messageService = TestBed.inject(MessageService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call showSuccess and add a success message', () => {
    spyOn(messageService, 'add');
    component.showSuccess();
    expect(messageService.add).toHaveBeenCalledWith({
      severity: 'success',
      summary: 'Success',
      detail: 'Message Content',
    });
  });

  it('should call showError and add an error message', () => {
    spyOn(messageService, 'add');
    component.showError();
    expect(messageService.add).toHaveBeenCalledWith({
      severity: 'error',
      summary: 'error',
      detail: 'Message Content',
    });
  });
});
