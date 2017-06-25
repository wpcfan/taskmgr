import { GB2260 } from './identity.data'

export function extractInfo(idNo: string) {
  const addrPart = idNo.substring(0, 6); // 前六位地址码
  const birthPart = idNo.substring(6, 14); // 八位生日
  const genderPart = parseInt(idNo.substring(14, 17), 10); // 性别

  return {
    addrCode: addrPart,
    dateOfBirth: birthPart,
    gender: genderPart % 2 !== 0
  };
}

export function isValidAddr(code: string): boolean {
  return GB2260[code] !== undefined;
}

export const getAddrByCode = (code) => {
  const provinceStr = GB2260[code.substring(0, 2) + '0000'];
  const cityStr = GB2260[code.substring(0, 4) + '00'];
  const districtStr = GB2260[code];
  const city = cityStr.replace(provinceStr, '');
  const district = districtStr.replace(cityStr, '');
  return {
    province: provinceStr,
    city: city,
    district: district
  };
};
