import type { Schema, Struct } from '@strapi/strapi';

export interface ElementsHeroSlide extends Struct.ComponentSchema {
  collectionName: 'components_elements_hero_slides';
  info: {
    displayName: 'HeroSlide';
    icon: 'alien';
  };
  attributes: {
    backgroundImage: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    subtitle: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface LayoutNavbar extends Struct.ComponentSchema {
  collectionName: 'components_layout_navbars';
  info: {
    displayName: 'Navbar';
  };
  attributes: {
    departementName: Schema.Attribute.String;
    fakultasName: Schema.Attribute.String;
    logo: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    menus: Schema.Attribute.Component<'navigation.menu-item', true>;
    showLanguege: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    showSearch: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
  };
}

export interface NavigationMenuItem extends Struct.ComponentSchema {
  collectionName: 'components_navigation_menu_items';
  info: {
    displayName: 'MenuItem';
  };
  attributes: {
    label: Schema.Attribute.String;
    submenu: Schema.Attribute.Component<'shared.link', true>;
    url: Schema.Attribute.String;
  };
}

export interface SectionHeroSlider extends Struct.ComponentSchema {
  collectionName: 'components_section_hero_sliders';
  info: {
    displayName: 'HeroSlider';
    icon: 'arrowRight';
  };
  attributes: {
    slides: Schema.Attribute.Component<'elements.hero-slide', true>;
  };
}

export interface SharedLink extends Struct.ComponentSchema {
  collectionName: 'components_shared_links';
  info: {
    displayName: 'Link';
  };
  attributes: {
    label: Schema.Attribute.String;
    url: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'elements.hero-slide': ElementsHeroSlide;
      'layout.navbar': LayoutNavbar;
      'navigation.menu-item': NavigationMenuItem;
      'section.hero-slider': SectionHeroSlider;
      'shared.link': SharedLink;
    }
  }
}
