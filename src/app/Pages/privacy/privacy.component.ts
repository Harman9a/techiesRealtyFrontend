import { Component } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.css'],
})
export class PrivacyComponent {
  constructor(
    public ds: DataService,
    private spinner: NgxSpinnerService,
    private titleService: Title,
    private route: ActivatedRoute,
    private metaService: Meta
  ) {
    this.titleService.setTitle(this.route.snapshot.data['title']);
    this.metaService.updateTag({
      name: 'description',
      content: this.route.snapshot.data['description'],
    });
  }

  otherData: any = [];

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.spinner.show();
    this.ds.getOtherData().subscribe((response: any) => {
      this.spinner.hide();
      this.otherData = response.privacy;
    });
  }
}
