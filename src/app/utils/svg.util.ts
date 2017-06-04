import { MdIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

export const loadSvgResources = (iconRegistry: MdIconRegistry, sanitizer: DomSanitizer) => {
  const avatarName = 'avatars';
  const avatarsSafeUrl = sanitizer.bypassSecurityTrustResourceUrl('assets/img/avatar/avatars.svg');
  iconRegistry.addSvgIconSetInNamespace(avatarName, avatarsSafeUrl);
  iconRegistry.addSvgIcon('project', sanitizer.bypassSecurityTrustResourceUrl('assets/img/sidebar/project.svg'));
  iconRegistry.addSvgIcon('projects', sanitizer.bypassSecurityTrustResourceUrl('assets/img/sidebar/projects.svg'));
  iconRegistry.addSvgIcon('month', sanitizer.bypassSecurityTrustResourceUrl('assets/img/sidebar/month.svg'));
  iconRegistry.addSvgIcon('week', sanitizer.bypassSecurityTrustResourceUrl('assets/img/sidebar/week.svg'));
  iconRegistry.addSvgIcon('day', sanitizer.bypassSecurityTrustResourceUrl('assets/img/sidebar/day.svg'));
  iconRegistry.addSvgIcon('move',sanitizer.bypassSecurityTrustResourceUrl('assets/img/icons/move.svg'));
  const days = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31
  ];
  days.forEach(day => {
    iconRegistry.addSvgIcon(`day${day}`,sanitizer.bypassSecurityTrustResourceUrl(`assets/img/days/day${day}.svg`));
  });
};
