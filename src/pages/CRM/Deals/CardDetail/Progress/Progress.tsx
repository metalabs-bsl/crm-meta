import { FC, useEffect, useState } from 'react';
import cn from 'classnames';
import { Loading } from 'common/ui';
import { LossForm, Modal } from 'common/components';
import { useNotify } from 'common/hooks';
import { useGetColumnsQuery } from 'api/admin/kanban/kanban.api';
import { useUpdateLeadColumnMutation } from 'api/admin/leads/endpoints/lead';
import { IGetColumnsRes } from 'types/entities';
import styles from './styles.module.scss';

import { BUTTON_TYPES } from 'types/enums';

interface IProps {
  currentStage?: string;
  lead_id?: string;
}

export const Progress: FC<IProps> = ({ currentStage, lead_id }) => {
  const notify = useNotify();
  const { data, isFetching } = useGetColumnsQuery();
  const [update, { isLoading }] = useUpdateLeadColumnMutation();
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [activeStage, setActiveStage] = useState<number>(0);
  const [isProgressFinishOpen, setIsProgressFinishOpen] = useState<boolean>(false);
  const [isLossOpen, setIsLossOpen] = useState<boolean>(false);
  const [lossId, setLossId] = useState<string>('');
  const [lossColumns, setLossColumns] = useState<IGetColumnsRes[]>([]);
  const [visibleColumns, setVisibleColumns] = useState<IGetColumnsRes[]>([
    {
      status: 10,
      id: '10',
      created_at: '',
      updated_at: '',
      name: 'Завершить сделку',
      color: '#f21212',
      order: 10
    }
  ]);

  useEffect(() => {
    if (data) {
      const easyColumns = data.filter((i) => i.status !== 6 && i.status !== 7);
      setVisibleColumns((prev) => [...easyColumns, ...prev]);
      const lossCols = data.filter((i) => i.status === 7);
      setLossColumns(lossCols);
    }
  }, [data]);

  useEffect(() => {
    if (currentStage && data) {
      const current = visibleColumns.findIndex((item) => item.id === currentStage);
      setCurrentIndex(current !== -1 ? current : visibleColumns.length - 1);
      setActiveStage(current !== -1 ? current : visibleColumns.length - 1);
    }
  }, [currentStage, data, visibleColumns]);

  useEffect(() => {
    const currentStageObj = data?.find((item) => item.id === currentStage);
    if (currentStageObj && currentStageObj?.status >= 6) {
      setVisibleColumns((prev) => [...prev.slice(0, -1), currentStageObj]);
    } else {
      setVisibleColumns((prev) => [
        ...prev.slice(0, -1),
        {
          status: 10,
          id: '10',
          created_at: '',
          updated_at: '',
          name: 'Завершить сделку',
          color: '#f21212',
          order: 10
        }
      ]);
    }
  }, [currentStage, data]);

  const changeStage = (index: number, item: IGetColumnsRes) => {
    setActiveStage(index);
    if (lead_id) {
      if (item.status === 10) {
        setIsProgressFinishOpen(true);
      } else {
        update({
          column_id: item.id,
          lead_id
        })
          .unwrap()
          .then(() => {
            notify(`Выбран статус -  "${item.name}"`);
            setCurrentIndex(index);
          });
      }
    }
  };

  const onCloseFinishModal = () => {
    setIsProgressFinishOpen(false);
  };

  const onSale = () => {
    if (data && lead_id) {
      const saleColumn = data.find((i) => i.status === 6);
      if (saleColumn) {
        update({
          column_id: saleColumn.id,
          lead_id
        })
          .unwrap()
          .then(() => {
            notify(`Выбран статус -  "${saleColumn.name}"`);
            onCloseFinishModal();
          });
      }
    }
  };

  const onLoss = () => {
    onCloseFinishModal();
    setIsLossOpen(true);
  };

  const onCloseLossModal = () => {
    setIsLossOpen(false);
  };

  const onLossCancel = () => {
    onCloseLossModal();
    setIsProgressFinishOpen(true);
  };

  const onLossSave = () => {
    if (lossId && data && lead_id) {
      const lossColumn = data.find((i) => i.id === lossId);
      if (lossColumn) {
        update({
          column_id: lossColumn.id,
          lead_id
        })
          .unwrap()
          .then(() => {
            onCloseLossModal();
            notify(`Выбран статус -  "${lossColumn.name}"`);
          });
      }
    }
  };

  return (
    <Loading isSpin={isFetching || isLoading}>
      <div className={styles.progress}>
        {visibleColumns?.map((item, index) => (
          <div
            key={index}
            className={cn(styles.progress_item)}
            onClick={() => changeStage(index, item)}
            onMouseEnter={() => setCurrentIndex(index)}
            onMouseLeave={() => setCurrentIndex(activeStage)}
            style={{
              borderBottomColor: index <= currentIndex ? visibleColumns[currentIndex].color : item.color,
              backgroundColor: index <= currentIndex ? visibleColumns[currentIndex].color : ''
            }}
          >
            {item.name}
          </div>
        ))}
        <Modal
          isOpen={isProgressFinishOpen}
          onClose={onCloseFinishModal}
          leftBtnText='продажа'
          leftBtnStyle={BUTTON_TYPES.GREEN}
          leftBtnAction={onSale}
          rightBtnText='проигрыш'
          rightBtnStyle={BUTTON_TYPES.RED}
          rightBtnAction={onLoss}
        >
          <Loading isSpin={isLoading}>
            <div className={styles.modalWrapper}>
              <p className={styles.modalWrapperText}>
                Выберите результат, <br /> с которым будет закрыта сделка.
              </p>
            </div>
          </Loading>
        </Modal>
        <Modal
          isOpen={isLossOpen}
          onClose={onCloseLossModal}
          leftBtnText='сохранить'
          leftBtnStyle={BUTTON_TYPES.YELLOW}
          leftBtnAction={onLossSave}
          rightBtnText='отменить'
          rightBtnStyle={BUTTON_TYPES.Link_BLACK}
          rightBtnAction={onLossCancel}
        >
          <LossForm onChangeValueType={setLossId} data={lossColumns} isLoading={isLoading} />
        </Modal>
      </div>
    </Loading>
  );
};
