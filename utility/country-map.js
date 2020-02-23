class Country {
  static getCountry(ccy) {
    var usd = ['us', 'united states', 'america', 'dollar', 'usa'];
    var eur = ['europe', 'euro'];
    var aed = ['united arab', 'arab', 'united arab emirates', 'dirham'];
    var gbp = [
      'british',
      'british pound',
      'pound',
      'england',
      'uk',
      'united kingdom'
    ];
    var jpy = ['japanese yen', 'yen', 'japan'];
    var chf = ['swiss', 'swizerland'];
    var sgd = ['singapore', 'singapore dollar'];
    var aud = ['australian dollar', 'australia'];
    var qar = ['qatari riyal', 'qatar'];
    var dkk = ['danish krone', 'denmark', 'greenland'];
    var cad = ['canadian dollar', 'canada'];
    var hkd = ['hong kong dollar', 'hong kong'];
    var bhd = ['baraini dinar', 'bahrain'];
    var krw = ['south korean won', 'won', 'south korea'];
    var thb = ['thai bhat', 'thailand'];
    var sek = ['swedish krona', 'sweden'];
    var kwd = ['kuwaiti dinar', 'kuwait'];
    var myr = ['malaysian ringgit', 'malaysia'];
    var sar = ['saudi riyal', 'saudi', 'saudi arabia'];
    var cny = ['renminbi', 'china', 'republic of china', 'yuan'];
    var inr = ['india', 'indian rupee'];
    if (usd.includes(ccy.toLowerCase())) {
      return 'USD';
    } else if (eur.includes(ccy.toLowerCase())) {
      return 'EUR';
    } else if (aed.includes(ccy.toLowerCase())) {
      return 'AED';
    } else if (gbp.includes(ccy.toLowerCase())) {
      return 'GDP';
    } else if (jpy.includes(ccy.toLowerCase())) {
      return 'JPY';
    } else if (chf.includes(ccy.toLowerCase())) {
      return 'CHF';
    } else if (jpy.includes(ccy.toLowerCase())) {
      return 'JPY';
    } else if (aud.includes(ccy.toLowerCase())) {
      return 'AUD';
    } else if (sgd.includes(ccy.toLowerCase())) {
      return 'SGD';
    } else if (cad.includes(ccy.toLowerCase())) {
      return 'CAD';
    } else if (dkk.includes(ccy.toLowerCase())) {
      return 'DKK';
    } else if (qar.includes(ccy.toLowerCase())) {
      return 'QAR';
    } else if (sek.includes(ccy.toLowerCase())) {
      return 'SEK';
    } else if (thb.includes(ccy.toLowerCase())) {
      return 'THB';
    } else if (krw.includes(ccy.toLowerCase())) {
      return 'KRW';
    } else if (bhd.includes(ccy.toLowerCase())) {
      return 'BHD';
    } else if (hkd.includes(ccy.toLowerCase())) {
      return 'HKD';
    } else if (inr.includes(ccy.toLowerCase())) {
      return 'INR';
    } else if (cny.includes(ccy.toLowerCase())) {
      return 'CNY';
    } else if (sar.includes(ccy.toLowerCase())) {
      return 'SAR';
    } else if (myr.includes(ccy.toLowerCase())) {
      return 'MYR';
    } else if (kwd.includes(ccy.toLowerCase())) {
      return 'KWD';
    }
  }
}

module.exports = Country;
