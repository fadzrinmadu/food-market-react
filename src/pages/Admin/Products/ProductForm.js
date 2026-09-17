import * as React from 'react';
import { useForm } from 'react-hook-form';
import { Button, FormControl, InputText, Select, Textarea } from '../../../components/ui';

import { getImageUrl } from '../../../utils/getImageUrl';
import { getCategories } from '../../../api/category';
import { getTags } from '../../../api/tag';

const rules = {
  name: {
    required: { value: true, message: 'Nama produk tidak boleh kosong.' },
    minLength: { value: 5, message: 'Nama produk minimal 5 karakter.' },
  },
  price: {
    required: { value: true, message: 'Harga tidak boleh kosong.' },
    min: { value: 0, message: 'Harga tidak boleh negatif.' },
  },
};

export default function ProductForm({ defaultValues, submitLabel = 'Simpan', onSubmit }) {
  let { handleSubmit, register, formState: { errors } } = useForm({
    defaultValues: {
      name: defaultValues?.name || '',
      description: defaultValues?.description || '',
      price: defaultValues?.price || '',
    },
  });
  let imageInputRef = React.useRef();

  let [categoryOptions, setCategoryOptions] = React.useState([]);
  let [tagOptions, setTagOptions] = React.useState([]);
  let [category, setCategory] = React.useState(
    defaultValues?.category ? { label: defaultValues.category.name, value: defaultValues.category.name } : null
  );
  let [tags, setTags] = React.useState(
    (defaultValues?.tags || []).map(tag => ({ label: tag.name, value: tag.name }))
  );

  React.useEffect(() => {
    (async () => {
      let { data: categories } = await getCategories();
      if (Array.isArray(categories)) {
        setCategoryOptions(categories.map(category => ({ label: category.name, value: category.name })));
      }

      let { data: tags } = await getTags();
      if (Array.isArray(tags)) {
        setTagOptions(tags.map(tag => ({ label: tag.name, value: tag.name })));
      }
    })();
  }, []);

  const handleFormSubmit = formData => {
    let file = imageInputRef.current?.files?.[0];

    onSubmit({
      name: formData.name,
      description: formData.description,
      price: formData.price,
      category: category?.value,
      tags: tags.map(tag => tag.value),
      image: file,
    });
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <FormControl label="Nama produk" errorMessage={errors.name?.message} color="black">
        <InputText
          fitContainer
          {...register('name', rules.name)}
        />
      </FormControl>

      <FormControl label="Deskripsi" errorMessage={errors.description?.message} color="black">
        <Textarea
          fitContainer
          {...register('description')}
        />
      </FormControl>

      <FormControl label="Harga" errorMessage={errors.price?.message} color="black">
        <InputText
          type="number"
          fitContainer
          {...register('price', rules.price)}
        />
      </FormControl>

      <FormControl label="Kategori" color="black">
        <Select
          options={categoryOptions}
          value={category}
          onChange={setCategory}
        />
      </FormControl>

      <FormControl label="Tags" color="black">
        <Select
          isMulti
          options={tagOptions}
          value={tags}
          onChange={setTags}
        />
      </FormControl>

      <FormControl label="Gambar produk" color="black">
        {defaultValues?.image_url ? (
          <img
            className="h-24 mb-2 rounded"
            src={getImageUrl(defaultValues.image_url)}
            alt={defaultValues.name}
          />
        ) : null}
        <input
          type="file"
          accept="image/*"
          name="image"
          ref={imageInputRef}
          className="block w-full text-sm bg-white border border-gray-200 rounded px-3 py-2"
        />
      </FormControl>

      <Button fitContainer>
        {submitLabel}
      </Button>
    </form>
  );
}
