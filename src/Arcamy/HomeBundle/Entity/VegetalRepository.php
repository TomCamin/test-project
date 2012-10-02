<?php

namespace Arcamy\HomeBundle\Entity;

use Doctrine\ORM\EntityRepository;

/**
 * VegetalRepository
 *
 * This class was generated by the Doctrine ORM. Add your own custom
 * repository methods below.
 */
class VegetalRepository extends EntityRepository
{
    public function getAllVegetals()
    {
        $qb = $this->createQueryBuilder('v')
               ->leftJoin('v.type', 't')
               ->addSelect('t');

    return $qb->getQuery()
               ->getResult();
    }
}
