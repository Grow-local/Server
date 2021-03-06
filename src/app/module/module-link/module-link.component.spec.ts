import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ModuleModule } from '../module.module';
import { ModuleService } from '../module.service';
import { MockModuleService } from '../module.service.mock';
import { ModuleLinkComponent } from './module-link.component';

describe('ModuleLinkComponent', () => {
  let component: ModuleLinkComponent;
  let fixture: ComponentFixture<ModuleLinkComponent>;
  let modulesService: ModuleService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        RouterTestingModule,
        ModuleModule,
      ],
      declarations: [
        ModuleLinkComponent,
      ],
      providers: [
        ModuleLinkComponent,
        { provide: ModuleService, useClass: MockModuleService },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(ModuleLinkComponent);
    component = fixture.componentInstance;
    modulesService = TestBed.inject(ModuleService);
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#onSavePlant', () => {
    it('should not call addNewPlant if the form is invalid', () => {
      const serviceSpy = spyOn(modulesService, 'addNewModule');

      component.form.get('name').setValue('ModuleA');
      component.form.get('module').setValue(component.rawModuleList[0]);

      component.onSaveModule();

      expect(serviceSpy).toHaveBeenCalledWith('ModuleA', '192.168.0.111');
    });

    it('should not call addNewPlant if the form is invalid', () => {
      const serviceSpy = spyOn(modulesService, 'addNewModule');

      component.onSaveModule();

      expect(serviceSpy).toHaveBeenCalledTimes(0);
    });
  });
});
