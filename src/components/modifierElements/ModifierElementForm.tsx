import React, { useEffect, useState } from 'react'
import CustomInputText from '../generics/CustomInputText'
import GenericForm from '../generics/GenericForm'
import CustomInputSelect from '../generics/CustomInputSelect'
import { useDelete, useGetList } from '../../hooks/useAPI'
import { ModifierElement } from '../../types/ModifierElement'
import CustomInputNumber from '../generics/CustomInputNumber'
import { regexOptions } from '../../enums/regexOptions'
import { Recipe } from '../../types/Recipe'
import CustomInputCheck from '../generics/CustomInputChecbox'
import { ModifierGroup } from '../../types/ModifierGroup'
import { Product } from '../../types/Product'
import { ProductReference } from '../../types/ProductReference'
import ModifierElementUpgradeContainer from '../../containers/modifierElementUpgrades/ModifierElementUpgradeContainer'
import { ModifierElementUpgrade } from '../../types/ModifierElementUpgrade'
import ElementPriceContainer from '../../containers/elementPrices/ElementPriceContainer'
import { ElementPrice } from '../../types/ElementPrice'
import { UpgradeElementPrice } from '../../types/UpgradeElementPrice'

interface Props {
  currentModifierElement: ModifierElement
  action: (modifierElement: ModifierElement) => void
  errors?: string[]
  modifierGroups: ModifierGroup[]
}

const initialProductReference: ProductReference = {
  id: 0,
  productId: 0,
  modifierElementId: 0,
  createdBy: 1,
  updatedBy: 1,
}

const initialModifierElementUpgrade: ModifierElementUpgrade = {
  id: 0,
  modifierElementId: 0,
  label: '',
  newModifierGroupId: 0,
  prices: [],
  createdBy: 1,
  updatedBy: 1,
}

const ModifierElementForm = ({
  currentModifierElement,
  modifierGroups,
  action,
  errors,
}: Props) => {
  const [modifierElement, setModifierElement] = useState<ModifierElement>({
    ...currentModifierElement,
    modifierUpgrade:
      currentModifierElement.modifierUpgrade?.id > 0
        ? currentModifierElement.modifierUpgrade
        : ({} as ModifierElementUpgrade),
  })

  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [isProduct, setIsProduct] = useState<boolean>(
    currentModifierElement.productReference !== null &&
      currentModifierElement.productReference?.id
      ? true
      : false
  )
  const [products, setProducts] = useState<Product[]>([])
  const [upgradable, setUpgradable] = useState<boolean>(
    modifierElement?.modifierUpgrade.id > 0 ? true : false
  )

  const submitText = currentModifierElement?.id === 0 ? 'Agregar' : 'Editar'

  const handleChange = (event: any) => {
    const { name, value } = event.target
    setModifierElement({ ...modifierElement, [name]: value })
  }

  const handleCheck = (event: any) => {
    const { name, checked } = event.target
    setModifierElement({ ...modifierElement, [name]: checked })
  }

  const handleProduct = (event: any) => {
    const { value } = event.target
    const productName = products.find(
      (product) => product.id === parseInt(value)
    )?.name
    setModifierElement({
      ...modifierElement,
      name: productName ? productName : modifierElement.name,
      productReference: {
        ...modifierElement.productReference,
        productId: value,
      },
    })
  }

  const handleIsProduct = async (event: any) => {
    const { checked } = event.target
    setIsProduct(checked)
    if (checked) {
      setModifierElement({
        ...modifierElement,
        productReference: initialProductReference,
      })
    } else {
      setModifierElement({
        ...modifierElement,
        productReference: {} as ProductReference,
      })
      await useDelete(`productReferences/${modifierElement.id}`)
    }
  }

  const handleUpgradableCheck = (event: any) => {
    const { checked } = event.target
    setUpgradable(checked)
    if (checked) {
      setModifierElement({
        ...modifierElement,
        modifierUpgrade: { ...initialModifierElementUpgrade },
      })
    } else {
      setModifierElement({
        ...modifierElement,
        modifierUpgrade: {} as ModifierElementUpgrade,
      })
    }
  }

  const handleModifierElementUpgradeChange = (event: any) => {
    const { name, value } = event.target
    setModifierElement({
      ...modifierElement,
      modifierUpgrade: {
        ...modifierElement.modifierUpgrade,
        [name]: value,
      },
    })
  }

  const addUpgradeElementPrice = (upgradeElementPrice: UpgradeElementPrice) => {
    const currentUpgradeElementPrice =
      modifierElement.modifierUpgrade.prices.find(
        (upgradeElementPriceItem: UpgradeElementPrice) =>
          upgradeElementPriceItem.menuId === upgradeElementPrice.menuId
      )
    if (currentUpgradeElementPrice) {
      setModifierElement({
        ...modifierElement,
        modifierUpgrade: {
          ...modifierElement.modifierUpgrade,
          prices: modifierElement.modifierUpgrade.prices.map(
            (upgradeElementPriceItem: UpgradeElementPrice) =>
              upgradeElementPriceItem.menuId === upgradeElementPrice.menuId
                ? upgradeElementPrice
                : upgradeElementPriceItem
          ),
        },
      })
    } else {
      setModifierElement({
        ...modifierElement,
        modifierUpgrade: {
          ...modifierElement.modifierUpgrade,
          prices: [
            ...modifierElement.modifierUpgrade.prices,
            upgradeElementPrice,
          ],
        },
      })
    }
  }

  const removeUpgradeElementPrice = (
    upgradeElementPrice: UpgradeElementPrice
  ) => {
    setModifierElement({
      ...modifierElement,
      modifierUpgrade: {
        ...modifierElement.modifierUpgrade,
        prices: modifierElement.modifierUpgrade.prices.filter(
          (upgradeElementPriceItem: UpgradeElementPrice) =>
            upgradeElementPriceItem.menuId !== upgradeElementPrice.menuId
        ),
      },
    })
  }

  const handleSubmit = () => {
    action(modifierElement)
  }

  const addElementPrice = (elementPrice: ElementPrice) => {
    const currentElementPrice = modifierElement.prices?.find(
      (elementPriceItem: ElementPrice) =>
        elementPriceItem.menuId === elementPrice.menuId
    )
    if (currentElementPrice) {
      setModifierElement({
        ...modifierElement,
        prices: modifierElement.prices?.map((elementPriceItem: ElementPrice) =>
          elementPriceItem.menuId === elementPrice.menuId
            ? elementPrice
            : elementPriceItem
        ),
      })
    } else {
      setModifierElement({
        ...modifierElement,
        prices: [...modifierElement.prices, elementPrice],
      })
    }
  }

  const removeElementPrice = (elementPrice: ElementPrice) => {
    setModifierElement({
      ...modifierElement,
      prices: modifierElement.prices?.filter(
        (elementPriceItem: ElementPrice) =>
          elementPriceItem.menuId !== elementPrice.menuId
      ),
    })
  }

  useEffect(() => {
    const getRecipes = async () => {
      const response = await useGetList<Recipe[]>('recipes')
      setRecipes(response.data)
    }
    const getProducts = async () => {
      const response = await useGetList<Product[]>('products')
      setProducts(response.data)
    }
    getProducts()
    getRecipes()
  }, [])

  return (
    <>
      <GenericForm
        errors={errors}
        submitText={submitText}
        handleSubmit={handleSubmit}
      >
        <ElementPriceContainer
          addElementPrice={addElementPrice}
          elementPrices={modifierElement.prices}
          removeElementPrice={removeElementPrice}
        />

        <CustomInputText
          value={modifierElement.name}
          customInputText={{
            label: 'Nombre de elemento',
            name: 'name',
            handleChange: handleChange,
            pattern: regexOptions.text,
            validationMessage: 'Ingrese un nombre válido',
          }}
        />

        <CustomInputSelect
          value={modifierElement.defaultRecipeId}
          customInputSelect={{
            label: 'Receta predeterminada',
            name: 'defaultRecipeId',
            handleChange: handleChange,
            pattern: '',
            validationMessage: 'Receta predeterminada',
          }}
          data={recipes.map((recipe) => {
            return { value: recipe.id, label: recipe.name }
          })}
          defaultLegend={'Recetas...'}
        />

        <CustomInputCheck
          value={modifierElement.combinable}
          customInputCheck={{
            label: '¿Es combinable?',
            pattern: '',
            validationMessage: '',
            name: 'combinable',
            handleChange: handleCheck,
          }}
        />

        {modifierElement.combinable && (
          <>
            <CustomInputSelect
              showLabel={false}
              value={modifierElement.combinableGroupId}
              customInputSelect={{
                label: 'Modificadores',
                name: 'combinableModifierGroupId',
                handleChange: handleChange,
                pattern: '',
                validationMessage: 'Seleccione un grupo',
              }}
              data={modifierGroups.map((modifierGroup) => {
                return { value: modifierGroup.id, label: modifierGroup.name }
              })}
              defaultLegend={'Modificadores'}
            />
          </>
        )}
        <CustomInputCheck
          value={isProduct}
          customInputCheck={{
            label: '¿Es producto?',
            pattern: '',
            validationMessage: '',
            name: 'isProduct',
            handleChange: handleIsProduct,
          }}
        />

        {isProduct && modifierElement.productReference && (
          <CustomInputSelect
            showLabel={false}
            value={modifierElement?.productReference?.productId}
            customInputSelect={{
              label: 'Productos',
              name: 'productId',
              handleChange: handleProduct,
              pattern: '',
              validationMessage: 'Seleccione un producto',
            }}
            data={products.map((product) => {
              return { value: product.id, label: product.name }
            })}
            defaultLegend={'Productos...'}
          />
        )}
        <CustomInputCheck
          value={upgradable}
          customInputCheck={{
            label: '¿Es mejorable?',
            pattern: '',
            validationMessage: '',
            name: 'upgradable',
            handleChange: handleUpgradableCheck,
          }}
        />

        {upgradable && (
          <div className='col-10 p-2'>
            <ModifierElementUpgradeContainer
              addUpgradeElementPrice={addUpgradeElementPrice}
              removeUpgradeElementPrice={removeUpgradeElementPrice}
              handleChange={handleModifierElementUpgradeChange}
              modifierGroups={modifierGroups}
              modifierElementUpgrade={modifierElement.modifierUpgrade}
            />
          </div>
        )}
      </GenericForm>
    </>
  )
}

export default ModifierElementForm
