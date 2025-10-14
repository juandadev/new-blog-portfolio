'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Textarea } from '@/components/ui/Textarea';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  ArrowLeft,
  Send,
  Wrench,
  Hash,
  LinkIcon,
  Tag,
  Smile,
} from 'lucide-react';

export default function NewToolPage() {
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [icon, setIcon] = useState('');
  const [url, setUrl] = useState('');
  const [customCategory, setCustomCategory] = useState('');

  const predefinedCategories = [
    'Utilidades',
    'Diseño',
    'Desarrollo',
    'SEO',
    'Analytics',
    'Productividad',
  ];

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Remove accents
      .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single
      .trim();
  };

  const handleNameChange = (value: string) => {
    setName(value);

    if (!slug || slug === generateSlug(name)) {
      setSlug(generateSlug(value));
    }
  };

  const handlePublish = () => {
    // Here you would save to your backend as published
    console.log('Publicando herramienta...');
  };

  const emojiSuggestions = [
    '⚡',
    '🎨',
    '🔍',
    '🔐',
    '📝',
    '🌈',
    '🚀',
    '💡',
    '🛠️',
    '🎯',
    '📊',
    '🔧',
    '💻',
    '🎮',
    '📱',
  ];

  return (
    <div>
      {/* Header */}
      <div className="bg-background sticky top-0 z-10 pt-20">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/dashboard/tools">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Volver
                </Link>
              </Button>
              <div>
                <h1 className="text-lg font-semibold">
                  Agregar Nueva Herramienta
                </h1>
                <p className="text-sm text-gray-500">
                  Completa la información de tu herramienta
                </p>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button
                size="sm"
                onClick={handlePublish}
                disabled={
                  !name.trim() ||
                  !slug.trim() ||
                  !description.trim() ||
                  !category ||
                  (category === 'custom' && !customCategory.trim()) ||
                  !url.trim()
                }
              >
                <Send className="mr-2 h-4 w-4" />
                Publicar
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-4xl space-y-6 p-4">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Wrench className="mr-2 h-5 w-5" />
              Información Básica
            </CardTitle>
            <CardDescription>
              Nombre y descripción de la herramienta
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium">
                Nombre de la Herramienta *
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="JSON Formatter, Color Picker, etc."
                className="text-base"
                aria-describedby="name-help"
                required
              />
              <p id="name-help" className="text-xs text-gray-500">
                Un nombre descriptivo y fácil de recordar
              </p>
            </div>

            {/* Slug */}
            <div className="space-y-2">
              <Label htmlFor="slug" className="text-sm font-medium">
                Slug (URL) *
              </Label>
              <div className="relative">
                <Hash className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                <Input
                  id="slug"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="json-formatter"
                  className="pl-10 font-mono text-base"
                  aria-describedby="slug-help"
                  required
                />
              </div>
              <p id="slug-help" className="text-xs text-gray-500">
                Se genera automáticamente. Será parte de la URL de tu
                herramienta
              </p>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm font-medium">
                Descripción *
              </Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe qué hace tu herramienta y cómo puede ayudar a los usuarios..."
                className="resize-none text-base"
                rows={4}
                maxLength={250}
                aria-describedby="description-help"
                required
              />
              <div className="flex justify-between text-xs text-gray-500">
                <p id="description-help">
                  Una descripción clara de la funcionalidad de la herramienta
                </p>
                <span>{description.length}/250</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Category and Icon */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <Tag className="mr-2 h-5 w-5" />
              Categoría e Icono
            </CardTitle>
            <CardDescription>
              Clasifica tu herramienta y añade un icono visual
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Category */}
            <div className="space-y-2">
              <Label htmlFor="category" className="text-sm font-medium">
                Categoría *
              </Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger id="category" aria-describedby="category-help">
                  <SelectValue placeholder="Selecciona una categoría" />
                </SelectTrigger>
                <SelectContent>
                  {predefinedCategories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                  <SelectItem value="custom">
                    + Crear nueva categoría
                  </SelectItem>
                </SelectContent>
              </Select>
              <p id="category-help" className="text-xs text-gray-500">
                Ayuda a organizar y filtrar tus herramientas
              </p>

              {/* Custom Category Input */}
              {category === 'custom' && (
                <div className="mt-2">
                  <Input
                    value={customCategory}
                    onChange={(e) => setCustomCategory(e.target.value)}
                    placeholder="Nombre de la nueva categoría"
                    className="text-base"
                  />
                </div>
              )}
            </div>

            {/* Icon */}
            <div className="space-y-2">
              <Label htmlFor="icon" className="text-sm font-medium">
                Icono (Opcional)
              </Label>
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Smile className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                  <Input
                    id="icon"
                    value={icon}
                    onChange={(e) => setIcon(e.target.value)}
                    placeholder="Elige un emoji"
                    className="pl-10 text-base"
                    maxLength={2}
                    aria-describedby="icon-help"
                  />
                </div>
                {icon && (
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg border bg-white text-2xl">
                    {icon}
                  </div>
                )}
              </div>
              <p id="icon-help" className="text-xs text-gray-500">
                Un emoji que represente visualmente tu herramienta
              </p>

              {/* Emoji Suggestions */}
              <div className="mt-2 flex flex-wrap gap-2">
                <p className="w-full text-xs text-gray-500">Sugerencias:</p>
                {emojiSuggestions.map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => setIcon(emoji)}
                    className="flex h-10 w-10 items-center justify-center rounded-lg border text-xl transition-colors hover:bg-gray-100"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* URL */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-lg">
              <LinkIcon className="mr-2 h-5 w-5" />
              Enlace de la Herramienta
            </CardTitle>
            <CardDescription>
              URL donde está alojada tu herramienta
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="url" className="text-sm font-medium">
                URL Completa *
              </Label>
              <div className="relative">
                <LinkIcon className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
                <Input
                  id="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://tools.juanda.dev/mi-herramienta"
                  type="url"
                  className="pl-10 text-base"
                  aria-describedby="url-help"
                  required
                />
              </div>
              <p id="url-help" className="text-xs text-gray-500">
                La dirección completa donde los usuarios pueden acceder a tu
                herramienta
              </p>
            </div>

            {/* URL Preview */}
            {url && (
              <div className="rounded-lg border bg-gray-50 p-4">
                <p className="mb-2 text-xs text-gray-500">
                  Vista previa del enlace:
                </p>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm break-all text-blue-600 hover:text-blue-800"
                >
                  {url}
                </a>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Action Buttons - Fixed at bottom on mobile */}
        <div className="sticky bottom-0 -mx-4 p-4">
          <div className="mx-auto flex max-w-4xl flex-col gap-3 sm:flex-row">
            <Button
              className="flex-1 sm:flex-none"
              onClick={handlePublish}
              disabled={
                !name.trim() ||
                !slug.trim() ||
                !description.trim() ||
                !category ||
                (category === 'custom' && !customCategory.trim()) ||
                !url.trim()
              }
            >
              <Send className="mr-2 h-4 w-4" />
              Publicar Herramienta
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
