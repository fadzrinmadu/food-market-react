import * as React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Button, ErrorState, FormControl, InputText, LayoutOne, Skeleton, Text, Textarea } from '../../components/ui';

import TopBar from '../../components/TopBar';
import BackButton from '../../components/BackButton';
import LocationPicker from '../../components/LocationPicker';
import { getAddressById, updateAddress } from '../../api/address';
import { asyncStatus } from '../../constants/asyncStatus';
import { rules } from '../UserAddressAdd/validation';

export default function UserAddressEdit() {
  let { id } = useParams();
  let history = useHistory();
  let { handleSubmit, register, errors, setValue } = useForm();
  let [status, setStatus] = React.useState(asyncStatus.idle);
  let [alamat, setAlamat] = React.useState(null);
  let [location, setLocation] = React.useState(null);
  let [isPrimary, setIsPrimary] = React.useState(false);

  const fetchAlamat = React.useCallback(async () => {
    setStatus(asyncStatus.process);
    let { data } = await getAddressById(id);

    if (data.error) {
      setStatus(asyncStatus.error);
      return;
    }

    setAlamat(data);
    setIsPrimary(Boolean(data.isPrimary));
    if (data.lat && data.lng) setLocation({ lat: data.lat, lng: data.lng });
    setValue('nama_alamat', data.nama);
    setValue('detail_alamat', data.detail);
    setStatus(asyncStatus.success);
  }, [id, setValue]);

  React.useEffect(() => {
    fetchAlamat();
  }, [fetchAlamat]);

  const onSubmit = async formData => {
    let payload = {
      nama: formData.nama_alamat,
      detail: formData.detail_alamat,
      isPrimary,
      lat: location?.lat,
      lng: location?.lng,
    };

    let { data } = await updateAddress(id, payload);

    if (data.error) return;

    history.push('/alamat-pengiriman');
  };

  const header = (
    <div className="flex items-center mb-6">
      <BackButton to="/alamat-pengiriman" />
      <div className="ml-3">
        <Text as="h3">Ubah alamat</Text>
      </div>
    </div>
  );

  if (status === asyncStatus.error) {
    return (
      <LayoutOne>
        <TopBar/>
        {header}
        <ErrorState message="Gagal memuat data alamat." onRetry={fetchAlamat} />
      </LayoutOne>
    );
  }

  if (status !== asyncStatus.success || !alamat) {
    return (
      <LayoutOne>
        <TopBar/>
        {header}
        <div>
          <Skeleton height="1.25rem" width="8rem" className="mb-2" />
          <Skeleton height="2.5rem" className="mb-6" />
          <Skeleton height="1.25rem" width="6rem" className="mb-2" />
          <Skeleton height="1.5rem" width="16rem" className="mb-6" />
          <Skeleton height="1.25rem" width="8rem" className="mb-2" />
          <Skeleton height="5rem" className="mb-6" />
        </div>
      </LayoutOne>
    );
  }

  return (
    <LayoutOne>
      <TopBar/>
      {header}

      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl label="Nama alamat" errorMessage={errors.nama_alamat?.message} color="black">
          <InputText
            placeholder="Nama alamat"
            fitContainer
            name="nama_alamat"
            ref={register(rules.nama_alamat)}
          />
        </FormControl>

        <FormControl label="Wilayah" color="black">
          <Text as="body">
            {alamat.provinsi}, {alamat.kabupaten}, {alamat.kecamatan}, {alamat.kelurahan}
          </Text>
        </FormControl>

        <FormControl label="Detail alamat" errorMessage={errors.detail_alamat?.message} color="black">
          <Textarea
            fitContainer
            name="detail_alamat"
            ref={register(rules.detail_alamat)}
          />
        </FormControl>

        <FormControl label="Pilih lokasi di peta (opsional)" color="black">
          <LocationPicker value={location} onChange={setLocation} />
        </FormControl>

        <FormControl color="black">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              className="mr-2"
              checked={isPrimary}
              onChange={e => setIsPrimary(e.target.checked)}
            />
            Jadikan alamat utama
          </label>
        </FormControl>

        <Button fitContainer>
          Simpan
        </Button>
      </form>
    </LayoutOne>
  );
}
