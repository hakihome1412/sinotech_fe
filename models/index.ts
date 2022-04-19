export type ProductItem = {
  _id: string;
  blurb?: string;
  body?: any[];
  categories?: {
    _ref: string;
    slug?: {
      current: string;
    },
    title?: string;
  }[];
  description?: {
    engine?: {
      acceleratorStructure?: string;
      brand?: string;
      coolingSystem?: string;
      cylinderCapacity?: string;
      model?: string;
      numbersOfCylinder?: string;
      pistonRunningCompartment?: string;
      qualityManagementStandards?: string;
      rotationSpeed?: string;
      startingSystem?: string;
      typeEngine?: string;
      voltage?: string;
    };
    overview?: {
      brand?: string;
      environmentManagementStandards?: string;
      fuelConsumption50?: number;
      fuelConsumption75?: number;
      fuelConsumption100?: number;
      manufacturingQualityStandards?: string;
      model?: string;
      origin?: string;
      prime?: string;
      qualityManagementStandards?: string;
      size?: string;
      standby?: string;
      voltage?: string;
      weight?: number;
    };
    player?: {
      conversionCoefficient?: string;
      brand?: string;
      isulation?: string;
      model?: string;
      numbersOfPhase?: string;
      productionStandard?: string;
      protectionLevel?: string;
      qualityManagementStandards?: string;
      radioInterferenceCoefficient?: string;
      typePlayer?: string;
      voltage?: string;
      voltageRegulatorMechanism?: string;
    };
    remoteControl?: {
      option?: string;
      origin?: string;
      productionStandard?: string;
      qualityManagementStandards?: string;
    };
  };
  idProduct?: string;
  images?: any[];
  insurance?: string;
  tags?: string[];
  vendor?: {
    _ref: string;
    slug?: {
      current: string;
    },
    title?: string;
  };
  price: number;
  slug: {
    current: string;
  };
  title: string;
  logo: any;
};

export type VendorItem = {
  _id: string;
  blurb: string;
  logo: any;
  slug: {
    current: string;
  };
  title: string;
  countProducts?: number
};

export type CommentItem = {
  _createdAt: string;
  _id: string;
  approval: boolean;
  comment: string;
  email: string;
  name: string;
  title: string;
}


export type BlogItem = {
  _id: string;
  description: any;
  logo: any;
  slug: {
    current: string;
  };
  title: string;
  _createdAt: string;
  blurb: string;
  comments: CommentItem[]
}

export type CategoryItem = {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  countProducts?: number
}

export type CarouselItem = {
  _id: string;
  title: string;
  blurb: string;
  logo: any;
}