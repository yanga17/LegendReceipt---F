'use client'

import { AddProductsModule, ViewProductsModule } from "@/modules/products"
import { Tab, Tabs } from "@/shared/ui/tab";

export default function Products() {

  const tabs: Tab[] = [
    {
      label: 'Add Product',
      content: <AddProductsModule />
    },
    {
      label: 'View Products',
      content: <ViewProductsModule />
    },
  ];

  return (
    <section className="w-full h-full flex flex-col justify-start gap-2">
      <Tabs tabs={tabs} />
    </section>
  )
}