import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useActivities } from '../context/useActvity';
import { useForm } from 'react-hook-form';

export function ActivityForm({ addActivity }) {
  const { createActivity, getActivity, updateActivity } = useActivities();
  const params = useParams();

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async data => {
    try {
      let newActivity;
      if (params.id) {
        newActivity = await updateActivity(params.id, data);
      } else {
        newActivity = await createActivity(data);
      }

      addActivity(newActivity);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const loadActivity = async () => {
      if (params.id) {
        const activity = await getActivity(params.id);
        console.log(activity);
        setValue('activityName', activity.activityName);
        setValue('description', activity.description);
        setValue('dueDate', activity.dueDate); // Cambiar el valor establecido
      }
    };
    loadActivity();
  }, [params.id, getActivity, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label className="input input-bordered flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 opacity-70">
          <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
        </svg>
        <input type="text" name="activityName" className="grow" placeholder="Nombre de Actividad" {...register('activityName')} />
      </label>

      <label className="input input-bordered flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 opacity-70">
          <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
        </svg>
        <input type="text" name="description" className="grow" placeholder="Descripcion" {...register('description')} />
      </label>

      <label className="input input-bordered flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 opacity-70">
          <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
        </svg>
        <input type="date" name="dueDate" className="grow" placeholder="Fecha a Entregar" {...register('dueDate')} />
      </label>
      <button className="btn btn-primary" type="submit">
        Ok
      </button>
    </form>
  );
}
