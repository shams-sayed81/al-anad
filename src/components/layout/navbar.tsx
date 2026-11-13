'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Logo } from '@/components/common/logo';
import { LanguageSwitcher } from './language-switcher';
import { useLenis } from '@/lib/lenis-provider';
import { QuoteModal } from '@/components/common/quote-modal';
import { ProduceCatalogModal } from '@/components/common/produce-catalog-modal';
import type { ProductCategory } from '@/data/products';
import { ChevronDown, Menu, X, ArrowLeft, ArrowRight, LayoutGrid, Sprout, Leaf, Apple } from 'lucide-react';

export function Navbar() {
  const locale = useLocale();
  const isAr = locale === 'ar';
  const t = useTranslations('nav');
  const tProd = useTranslations('products');
  const { scrollTo } = useLenis();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [quoteProduct, setQuoteProduct] = useState<string | undefined>(undefined);
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const [catalogCategory, setCatalogCategory] = useState<'all' | ProductCategory>('all');

  const dropdownRef = useRef<HTMLDivElement>(null);
  const Arrow = isAr ? ArrowLeft : ArrowRight;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);

      const sections = ['hero', 'about', 'products', 'journey', 'services', 'partners', 'contact'];
      const scrollPos = window.scrollY + 140;

      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 60) {
        setActiveSection('contact');
        return;
      }

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setProductsDropdownOpen(false);
        setMobileMenuOpen(false);
      }
    };
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setProductsDropdownOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const navItems = [
    { id: 'hero', label: t('home'), href: '#hero' },
    { id: 'about', label: t('about'), href: '#about' },
    { id: 'products', label: t('products'), href: '#products', hasDropdown: true },
    { id: 'journey', label: t('supplyChain'), href: '#journey' },
    { id: 'services', label: t('services'), href: '#services' },
    { id: 'partners', label: t('partners'), href: '#partners' },
    { id: 'contact', label: t('contact'), href: '#contact' },
  ];

  const productCategories: Array<{
    key: 'all' | ProductCategory;
    label: string;
    icon: React.ReactNode;
  }> = [
    { key: 'all', label: tProd('categories.all'), icon: <LayoutGrid className="w-4 h-4 text-[#CCA35B]" /> },
    { key: 'veg', label: tProd('categories.veg'), icon: <Sprout className="w-4 h-4 text-[#3D6647]" /> },
    { key: 'leaf', label: tProd('categories.leaf'), icon: <Leaf className="w-4 h-4 text-[#3D6647]" /> },
    { key: 'fruit', label: tProd('categories.fruit'), icon: <Apple className="w-4 h-4 text-[#CCA35B]" /> },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      setMobileMenuOpen(false);
      setProductsDropdownOpen(false);
      scrollTo(href, { offset: -70 });
    }
  };

  const openCategoryCatalog = (cat: 'all' | ProductCategory) => {
    setProductsDropdownOpen(false);
    setMobileMenuOpen(false);
    setCatalogCategory(cat);
    setIsCatalogOpen(true);
  };

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-ivory-canvas/95 backdrop-blur-md shadow-[0_4px_20px_-4px_rgba(24,61,43,0.06)] py-3 border-b border-forest/10'
            : 'bg-gradient-to-b from-black/55 via-black/25 to-transparent py-4 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 lg:gap-8">
            {/* 1. Brand Logo at Start with Vertical Divider */}
            <div className="flex items-center gap-4 flex-shrink-0">
              <Logo variant={isScrolled ? 'dark' : 'light'} />
              <span
                className={`hidden xl:block h-6 w-px ${isScrolled ? 'bg-forest/20' : 'bg-white/25'}`}
                aria-hidden="true"
              />
            </div>

            {/* 2. Desktop Navigation Links in Center */}
            <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                const linkColor = isScrolled
                  ? isActive
                    ? 'text-forest font-bold'
                    : 'text-forest/75 hover:text-forest'
                  : isActive
                  ? 'text-white font-bold'
                  : 'text-white/85 hover:text-white';
                const underlineColor = isScrolled ? 'bg-forest' : 'bg-gold';

                if (item.hasDropdown) {
                  return (
                    <div
                      key={item.id}
                      ref={dropdownRef}
                      className="relative"
                      onMouseEnter={() => setProductsDropdownOpen(true)}
                      onMouseLeave={() => setProductsDropdownOpen(false)}
                    >
                      <div className="inline-flex items-center gap-1">
                        <a
                          href={item.href}
                          onClick={(e) => handleNavClick(e, item.href)}
                          className={`relative text-xs xl:text-sm font-semibold transition-colors duration-200 py-1.5 inline-flex items-center gap-1 ${linkColor}`}
                        >
                          <span>{item.label}</span>
                          <span
                            className={`absolute -bottom-0.5 inset-x-0 h-[2px] ${underlineColor} rounded-full transition-all duration-300 origin-center ${
                              isActive ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'
                            }`}
                          />
                        </a>
                        <button
                          type="button"
                          aria-label={isAr ? 'قائمة المنتجات' : 'Products menu'}
                          aria-expanded={productsDropdownOpen}
                          onClick={() => setProductsDropdownOpen((prev) => !prev)}
                          className={`p-0.5 transition-colors ${
                            isScrolled ? 'text-forest/60 hover:text-forest' : 'text-white/75 hover:text-white'
                          }`}
                        >
                          <ChevronDown
                            className={`w-3.5 h-3.5 transition-transform duration-200 ${
                              productsDropdownOpen ? 'rotate-180' : ''
                            }`}
                          />
                        </button>
                      </div>

                      {productsDropdownOpen && (
                        <div className="absolute top-full start-0 pt-2 w-56 z-50 animate-dropdown-in">
                          <div className="rounded-2xl bg-ivory-canvas border border-forest/10 shadow-editorial-lg p-2 flex flex-col gap-1">
                            {productCategories.map((cat) => (
                              <button
                                key={cat.key}
                                type="button"
                                onClick={() => openCategoryCatalog(cat.key)}
                                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-forest/85 hover:text-forest hover:bg-forest/5 transition-colors text-start"
                              >
                                {cat.icon}
                                <span>{cat.label}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <a
                    key={item.id}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`relative text-xs xl:text-sm font-semibold transition-colors duration-200 py-1.5 inline-flex items-center gap-1 group ${linkColor}`}
                  >
                    <span>{item.label}</span>
                    <span
                      className={`absolute -bottom-0.5 inset-x-0 h-[2px] ${underlineColor} rounded-full transition-all duration-300 origin-center ${
                        isActive ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0 group-hover:scale-x-50 group-hover:opacity-40'
                      }`}
                    />
                  </a>
                );
              })}
            </nav>

            {/* 3. Language Switcher & Quote CTA Button at End */}
            <div className="hidden sm:flex items-center gap-4">
              <LanguageSwitcher variant={isScrolled ? 'dark' : 'light'} />

              <button
                type="button"
                onClick={() => {
                  setQuoteProduct(undefined);
                  setIsQuoteModalOpen(true);
                }}
                className="group inline-flex items-center gap-3 bg-forest hover:bg-forest-light active:bg-forest-dark text-ivory-canvas text-xs sm:text-sm font-bold ps-4 pe-1.5 py-1.5 rounded-full shadow-md transition-all duration-300 hover:shadow-lg border border-white/15"
              >
                <span>{t('cta')}</span>
                <span className="w-7 h-7 rounded-full bg-gold-dark group-hover:bg-gold text-ivory-canvas flex items-center justify-center transition-all duration-300 group-hover:scale-105">
                  <Arrow className="w-3.5 h-3.5" />
                </span>
              </button>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex items-center gap-2 sm:hidden">
              <LanguageSwitcher variant={isScrolled ? 'dark' : 'light'} />
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle Navigation Menu"
                aria-expanded={mobileMenuOpen}
                className={`p-2 rounded-xl transition-colors ${
                  isScrolled ? 'text-forest hover:bg-forest/5' : 'text-white hover:bg-white/10'
                }`}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-ivory-canvas/98 backdrop-blur-md border-b border-forest/10 px-6 py-6 flex flex-col gap-4 shadow-xl animate-dropdown-in">
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <div
                  key={item.id}
                  className="border-b border-forest/5 flex items-center justify-between"
                >
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`flex-1 text-base font-bold py-2.5 transition-colors ${
                      activeSection === item.id ? 'text-gold-dark' : 'text-forest'
                    }`}
                  >
                    {item.label}
                  </a>
                  {item.hasDropdown && (
                    <button
                      type="button"
                      onClick={() => openCategoryCatalog('all')}
                      className="text-xs font-semibold text-gold-dark px-2.5 py-1 rounded-full bg-gold/15 hover:bg-gold/25 transition-colors"
                    >
                      {isAr ? 'تصفح الكتالوج' : 'Catalog'}
                    </button>
                  )}
                </div>
              ))}
            </nav>

            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                setQuoteProduct(undefined);
                setIsQuoteModalOpen(true);
              }}
              className="mt-2 w-full inline-flex items-center justify-center gap-3 bg-[#183D2B] hover:bg-[#23553D] text-white py-3 rounded-full font-bold text-sm shadow-md transition-colors"
            >
              <span>{t('cta')}</span>
              <span className="w-6 h-6 rounded-full bg-[#BC8F47] flex items-center justify-center">
                <Arrow className="w-3.5 h-3.5" />
              </span>
            </button>
          </div>
        )}
      </header>

      {/* Quote Request Modal */}
      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        initialProduct={quoteProduct}
      />

      {/* Produce Catalog Modal */}
      <ProduceCatalogModal
        isOpen={isCatalogOpen}
        onClose={() => setIsCatalogOpen(false)}
        initialCategory={catalogCategory}
        onRequestQuote={(productName) => {
          setQuoteProduct(productName);
          setIsQuoteModalOpen(true);
        }}
      />
    </>
  );
}
