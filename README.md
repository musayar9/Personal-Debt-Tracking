## Kişisel Borç Takip Uygulaması


https://github.com/musayar9/Personal-Debt-Tracking/assets/96313325/6eb175cb-8d6d-42d1-b80f-b30a88cbace5


### Kullanılan Teknolojiler

![react](https://img.shields.io/badge/react-18.2.0-lightblue)
![typescript](https://img.shields.io/badge/typescript-5.2.2-blue)
![reduxjs/toolkit](https://img.shields.io/badge/reduxjs/toolkit-2.2.5-green)
![autoprefixer](https://img.shields.io/badge/autoprefixer-10.4.17-yellow)
![flowbite-react](https://img.shields.io/badge/flowbite--react-0.9.0-orange)
![postcss](https://img.shields.io/badge/postcss-8.4.38-purple)
![react-dom](https://img.shields.io/badge/react--dom-18.2.0-lightgrey)
![react-helmet](https://img.shields.io/badge/react--helmet-2.0.5-darkblue)
![react-icons](https://img.shields.io/badge/react--icons-5.2.1-darkgreen)
![react-loader-spinner](https://img.shields.io/badge/react--loader--spinner-6.1.6-darkred)
![react-redux](https://img.shields.io/badge/react--redux-9.1.0-pink)
![react-router-dom](https://img.shields.io/badge/react--router--dom-6.22.1-gold)
![redux-persist](https://img.shields.io/badge/redux--persist-6.0.0-silver)
![tailwindcss](https://img.shields.io/badge/tailwindcss-3.4.4-lightgreen)
![date-fns](https://img.shields.io/badge/date--fns-3.6.0-yellow)

### Proje Ön Tanıtım

Bu proje, JavaScript'in güçlü framework'ü olan ``ReactJs`` ile geliştirilmiştir. Proje, durum yönetimi için ``react-redux ve redux-toolkit ``kullanmaktadır. Elde edilen verilerin localStorage'da saklanması işlemleri ``redux-persist`` kütüphanesi ile sağlanmıştır. Oluşturulan verilerin tip kontrolü ise ``TypeScript`` ile yapılmıştır. Uygulama içinde yönlendirme (routing) işlemleri için ``react-router-dom`` kütüphanesi kullanılmaktadır.

UI tasarımı için ise ``tailwindcss``, ``flowbite`` ve ``flowbite-react`` kütüphaneleri kullanılmıştır. Bu kütüphaneler, modern ve kullanıcı dostu bir arayüz oluşturmak için tercih edilmiştir.
### Proje İçeriği

Bu uygulama, kullanıcıların kendi kişisel borçlarını zahmetsizce yönetmelerini sağlar. İşte uygulamanın sunduğu harika özellikler:

- `Kişisel Borçlarınızı Oluşturun:` Kolay ve hızlı bir şekilde kendi borçlarınızı ekleyebilirsiniz.

- `Borç Taksitlendirme:` Borçlarınızı taksitlendirerek ödemelerinizi daha yönetilebilir hale getirin.

- `Borç Düzenleme:` Oluşturduğunuz borçları dilediğiniz zaman güncelleyebilir ve değişiklik yapabilirsiniz.

- `Borç Silme:` Borçlarınızı tek tıkla silebilirsiniz.

- `Yaklaşan Borç Ödemeleri:` Yaklaşan borç ödemelerinizi uygulama üzerinden kolayca gerçekleştirebilirsiniz.

- `Borç Takibi:` Borçlarınızın durumunu takip edebilir, ödeme tarihlerinizi kaçırmadan yönetebilirsiniz.

## İndirme İşlemler

1.  Githubdan ilgili repository kendi localinize klonlayın:

```javascript
git clone https://github.com/musayar9/Personal-Debt-Tracking.git
```

2. İnen dosyayı çalıştırmak için gerekli olan bağımlılıkları indirin

```
npm install
```

or

```
yarn
```

3. Projeyi Ayağa Kaldırma
   Bağımlılıkları indirdikten sonra, projeyi çalıştırmak için aşağıdaki komutları kullanabilirsiniz.

```
 npm run dev
```

or

```
yarn run dev
```

## Proje Sayfaları

### Kullanıcı Kayıt Sayfası

Bu sayfada kullanıcı uygulamaya kayıt oluyor kayıt işlemi gerçekleştikten sonra kullanıcı giriş sayfasına yönlendirilecek.

![img-1](public/images/1.jpg)

### Kullanıcı Giriş Sayfası

Bu sayfada uygulamaya kayıt olan kullanıcı artık uygulamaya email ve password bilgisiyle giriş yapabilecek. Sisteme giriş yapan kullanıcı dashboard sayfasına yönlendirilecek.

![img-2](public/images/2.jpg)

### Dashboard Sayfası

Uygulamaya ilk defa giriş yapan kullanıcın hiç bir borç kaydı bulunmadığı için `henüz borucunuz bulunmamaktadır` yazısı gözükecek. Aşağıda bulunan `create debt` butonun tıkldığında kullanıcı borç oluşturma sayfasına yönlendirilecek.

![img-3](public/images/3.jpg)

### Borç (Create Debt) Oluşturma Sayfası

Bu sayfada kullanıcı kendine özgü borçları oluşturabilir ve istediği aya kadar taksitlendirebilir.

![img-4](public/images/4.jpg)

### Borçların Dashboard Sayfasında Gösterilmesi

Bu sayfada kullanıcı toplam borç sayını görüntüleyebilir. Güncel olan borçlarını görebilir.

![img-5](public/images/5.jpg)

### Oluşturulan Borçların Borç(Debt) Sayfasında Gösterilmesi

Bu sayfada kullanıcı oluşturmuş olduğu tüm borçları tabloda görüntüleyebilir. Bu tabloda borca ait detaylı bilgiler bulunmaktadır.
Kullanıcı bu istediğini borcunu silebilir, düzenleyebilir ve borcunun ödeme işlemlerini yapabilir.

![img-7](public/images/7.jpg)

#### Borç Düzenleme

Kullanıcı tabloda `edit` butonuna tıkladığında iligili borc için borç düzenleme sayfasına yönlendirilecek.

![img-8](public/images/8.jpg)

#### Borç Ödeme

Kullanıcı tabloda `pay debt` butonuna tıkladığında ilgili borca ait olan borç bilgilerinin ve ödeme planını bulunduğu sayfaya yönlendirilecek. Kullanıcı bu sayfada ilgili borca ait olan taksit ödemlerini bu sayfadan yapabilir.

![img-9](public/images/9.jpg)

#### Borç Silme

Kullanıcı tabloda `delete` butonuna tıkladığında ilgili borcu tablodan silebilecektir.

![img-10](public/images/10.jpg)

### AnaSayfa

Kullanıcı navbar üzerinde yer alan `Home` linkine tıkladığında anasayfaya yönlendirilecektir.

![img-11](public/images/11.jpg)

### Oturumu Sonlandırma

Kullanıcı navbar üzerinde bulundan ve dashboard alanında bulunan `SignOut` butonlarından herhangi birine tıkladığında uygulamadan çıkış yapmış olacaktır.

![img-12](public/images/12.jpg)
