import { Component, OnInit , Output, EventEmitter} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { MatCardModule } from '@angular/material/card';
import { GetApisService } from 'src/app/services/get-apis.service';
import * as AOS from 'aos';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    NgChartsModule,
    MatCardModule,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  // KPIs
  totalOrders = 0;
  totalRevenue = 0;
  totalCustomers = 0;

  // Charts Data
  mostDemandedProductsChart: any;
  topRevenueCategoriesChart: any;
  customerBehaviorChart: any;
  timeBasedOrderChart: any;
  categoryProductDemandChart: any;
  cartRevenueAnalysisChart: any;
  heatmapChartData: any;

  // New Charts
  ageGroupChart: any;
  productDistributionChart: any;
  salesOverTimeChart: any;

  comments: any;
  userId: any;
  user: any;
  userImg: string = '';


  chart: any;
  labels = ['Label1', 'Label2', 'Label3']; // أمثلة على التسميات
  data = [10, 20, 30]; // أمثلة على البيانات
  label = 'My Bar Chart';

  constructor(private http: GetApisService) { }


  @Output() ready = new EventEmitter<void>();

  ngOnInit() {

    // Simulate data loading or setup
    setTimeout(() => {
      this.ready.emit(); // Notify that HomeComponent is ready
    }, 1000); // Adjust delay as needed

    this.loadDashboardData();

    this.chart = this.generateBarChart(this.labels, this.data, this.label);

    // إضافة مستمع لتغيير الحجم
    window.addEventListener('resize', () => this.handleResize());

    AOS.init({
      duration: 800, // مدة الحركة بالميلي ثانية
      easing: 'ease-in-out', // تأثير الحركة
      once: false // الحركة تحدث في كل مرة يتم التمرير
    });
  }


  ngOnDestroy(): void {
    // إزالة مستمع تغيير الحجم عند تدمير المكون
    window.removeEventListener('resize', () => this.handleResize());
  }

  handleResize(): void {
    // تحديث الرسم البياني عند تغيير الحجم
    this.chart = this.generateBarChart(this.labels, this.data, this.label);
  }


  loadDashboardData() {
    // Fetch data for all required charts
    this.http.getCarts().subscribe((carts: any) => {
      if (!carts || !carts.carts) return;

      this.totalOrders = carts.total;
      this.totalRevenue = carts.carts.reduce(
        (sum: number, cart: any) => sum + cart.total,
        0
      );

      // Time-based Order Analysis
      this.timeBasedOrderChart = this.generateLineChart(
        carts.carts.map((cart: any) => `Cart #${cart.id}`),
        carts.carts.map((cart: any) => cart.total),
        'Order Revenue Over Time'
      );

      // Sales Over Time Chart
      this.salesOverTimeChart = this.generateLineChart(
        carts.carts.map((cart: any) => new Date(cart.date).toLocaleDateString()),
        carts.carts.map((cart: any) => cart.total),
        'Sales Over Time'
      );

      const labels = carts.carts.map((cart: any) => `Cart #${cart.id}`);
      const data = carts.carts.map((cart: any) => cart.total);
      this.heatmapChartData = this.generateScatterChart(labels, data, 'Monthly Data');
    });

    this.http.getProducts().subscribe((products: any) => {
      if (!products || !products.products) return;

      const allProducts = products.products;

      // Most Demanded Products
      this.mostDemandedProductsChart = this.generateBarChart(
        allProducts.map((product: any) => product.title),
        allProducts.map((product: any) => product.stock),
        'Stock Level (Demand)'
      );

      // Top Revenue-Generating Categories
      const categoryRevenueMap = allProducts.reduce((map: any, product: any) => {
        map[product.category] =
          (map[product.category] || 0) + product.price * product.stock;
        return map;
      }, {});

      this.topRevenueCategoriesChart = this.generatePieChart(
        Object.keys(categoryRevenueMap),
        Object.values(categoryRevenueMap),
        'Total Revenue by Category'
      );

      // Product Distribution Chart
      this.productDistributionChart = this.generatePieChart(
        allProducts.map((product: any) => product.title),
        allProducts.map((product: any) => product.price * product.stock),
        'Product Distribution (Revenue)'
      );
    });

    this.http.getUsers().subscribe((users: any) => {
      if (!users || !users.users) return;

      this.totalCustomers = users.total;

      // Customer Behavior Analysis
      this.customerBehaviorChart = this.generateScatterChart(
        users.users.map((user: any) => user.username),
        users.users.map(() => Math.floor(Math.random() * 10) + 1),
        'Customer Behavior'
      );

      // Age Group Chart
      const ageGroups = { '18-25': 0, '26-35': 0, '36-45': 0, '46-60': 0, '60+': 0 };
      users.users.forEach((user: any) => {
        const age = user.age;
        if (age <= 25) ageGroups['18-25']++;
        else if (age <= 35) ageGroups['26-35']++;
        else if (age <= 45) ageGroups['36-45']++;
        else if (age <= 60) ageGroups['46-60']++;
        else ageGroups['60+']++;
      });

      this.ageGroupChart = this.generateBarChart(
        Object.keys(ageGroups),
        Object.values(ageGroups),
        'Age Group Distribution'
      );
    });
  }

  // generateBarChart(labels: string[], data: number[], label: string) {
  //   const colors = [ 'rgb(255, 208, 0)','#36a2eb', '#0c1685', '#0f57f2', '#ffd700', '#ffec8b', '#8ebaff'];

  //   return {
  //     labels,
  //     datasets: [
  //       {
  //         label,
  //         data,
  //         backgroundColor: colors.slice(0, labels.length),
  //       },
  //     ],
  //   };
  // }





  generateBarChart(labels: string[], data: number[], label: string) {
    const colors = ['rgb(255, 208, 0)', '#36a2eb', '#0c1685', '#0f57f2', '#ffd700', '#ffec8b', '#8ebaff'];

    // التحقق من حجم الشاشة
    const isSmallScreen = window.innerWidth < 768;

    return {
      labels: isSmallScreen ? labels.map(() => '') : labels, // إخفاء النصوص في الشاشة الصغيرة
      datasets: [
        {
          label,
          data,
          backgroundColor: colors.slice(0, labels.length),
        },
      ],
      options: {
        plugins: {
          legend: {
            display: true, // إظهار الأسطورة
          },
        },
        scales: {
          x: {
            ticks: {
              display: !isSmallScreen, // إخفاء النصوص فقط
            },
            grid: {
              drawBorder: true, // عرض خطوط الشبكة أو الحافة
              display: true, // عرض الشبكة الرأسية (للنقاط)
            },
          },
          y: {
            ticks: {
              display: true, // الإبقاء على النصوص العمودية
            },
          },
        },
      },
    };
  }



  generatePieChart(labels: string[], data: number[], label: string) {
    const colors = ['#36a2eb', '#0c1685', 'rgb(255, 208, 0)', '#0f57f2', '#ffd700', '#ffec8b', '#8ebaff'];

    return {
      labels,
      datasets: [
        {
          label,
          data,
          backgroundColor: colors.slice(0, labels.length),
        },
      ],
    };
  }


  generateLineChart(labels: string[], data: number[], label: string) {
    return {
      labels,
      datasets: [
        {
          label,
          data,
          borderColor: 'rgb(255, 208, 0)',
          backgroundColor: 'rgb(255, 208, 0)',
          tension: 0.4,
        },
      ],
      options: {
        scales: {
          x: {
            grid: {
              color: 'green', // لون خطوط الشبكة للمحور X
            },
            ticks: {
              color: 'green', // لون الأرقام والعناوين على المحور X
            },
          },
          y: {
            grid: {
              color: 'green', // لون خطوط الشبكة للمحور Y
            },
            ticks: {
              color: 'green', // لون الأرقام والعناوين على المحور Y
            },
          },
        },
      },
    };
  }


  generateScatterChart(labels: string[], data: number[], label: string) {
    return {
      datasets: [
        {
          label,
          data: labels.map((label, index) => ({
            x: index,
            y: data[index],
          })),
          backgroundColor: 'rgb(255, 208, 0)',
          borderColor: 'rgb(255, 208, 0)',
          borderWidth: 1,
        },
      ],
      options: {
        scales: {
          x: {
            grid: {
              color: 'green', // لون الشبكة للمحور X
            },
            ticks: {
              color: 'green', // لون النصوص للمحور X
            },
          },
          y: {
            grid: {
              color: 'green', // لون الشبكة للمحور Y
            },
            ticks: {
              color: 'green', // لون النصوص للمحور Y
            },
          },
        },
      },
    };
  }

}
