// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries

// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { CategoriesService, Category } from '@bluebits/products';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'admin-categories-list',
  templateUrl: './categories-list.component.html',
  styles: [],
})
export class CategoriesListComponent implements OnInit {
  constructor(
    private categoriesService: CategoriesService,
    private confirmationService: ConfirmationService,
    private location: Location,
    private router: Router,
    private messageService: MessageService
  ) {}
  categories: Category[] = [];
  ngOnInit(): void {
    this.getAllCategories();
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-function

  getAllCategories() {
    this.categoriesService.getCategories().subscribe((cats) => {
      this.categories = cats;
    });
  }

  deleteCategory(categoryId: string) {
    this.confirmationService.confirm({
      message: 'Do you want to Delete this Category?',
      header: 'Delete Category',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.categoriesService.deleteCategory(categoryId).subscribe(
          () => {
            this.getAllCategories();
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Category is deleted!',
            });
          },
          () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Category is not deleted!',
            });
          }
        );
      },
    });
  }
  // update categories
  updateCategory(categoryid: string) {
    this.router.navigateByUrl(`categories/form/${categoryid}`);
  }
  onCancle() {
    this.location.back();
  }
}
