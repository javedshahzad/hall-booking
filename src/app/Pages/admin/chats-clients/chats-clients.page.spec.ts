import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChatsClientsPage } from './chats-clients.page';

describe('ChatsClientsPage', () => {
  let component: ChatsClientsPage;
  let fixture: ComponentFixture<ChatsClientsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ChatsClientsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
